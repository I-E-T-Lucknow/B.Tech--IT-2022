package com.programmingtech.iet_canteen

import adapters.RecyclerSavedCardsAdapter
import android.app.Activity
import android.app.AlertDialog
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import com.google.firebase.auth.FirebaseAuth
import com.razorpay.Checkout
import com.razorpay.PaymentResultListener
import datamodels.SavedCardItem
import org.json.JSONObject
import papaya.`in`.sendmail.SendMail


class PaymentActivity : AppCompatActivity(), RecyclerSavedCardsAdapter.OnItemClickListener,PaymentResultListener {

    private lateinit var totalPaymentTV: TextView
    private lateinit var confirmPaymentBtn: Button
    private lateinit var paymentRazorPayBtn: Button
    private lateinit var paymentBhimUpiBtn: Button

    private lateinit var cashPaymentRB: RadioButton
    private lateinit var walletsRB: RadioButton
    private lateinit var bhimUpiRB: RadioButton
    private lateinit var netBankingRB: RadioButton

    private lateinit var walletSection: LinearLayout
    private lateinit var bhimUpiSection: LinearLayout
    private lateinit var address: String
    private var orderID = ""



    private lateinit var auth : FirebaseAuth

    var totalItemPrice = 0.0F
    var totalTaxPrice = 0.0F
    var subTotalPrice = 0.0F

    var takeAwayTime = ""

    private var selectedWallet = ""
    private var selectedSavedCard = ""
    private var enteredUPI = ""

    private lateinit var savedCardsRecyclerAdapter: RecyclerSavedCardsAdapter
    private val savedCardItems = ArrayList<SavedCardItem>()

    override fun onBackPressed() {
        AlertDialog.Builder(this)
            .setIcon(R.drawable.ic_alert)
            .setTitle("Alert!")
            .setMessage("Do you want to cancel the payment?")
            .setPositiveButton("Yes", DialogInterface.OnClickListener { _, _ ->
                super.onBackPressed()
            })
            .setNegativeButton("No", DialogInterface.OnClickListener { dialogInterface, _ ->
                dialogInterface.dismiss()
            })
            .create().show()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)

        totalItemPrice = intent.getFloatExtra("totalItemPrice", 0.0F)
        totalTaxPrice = intent.getFloatExtra("totalTaxPrice", 0.0F)
        subTotalPrice = intent.getFloatExtra("subTotalPrice", 0.0F)
        address = intent.getStringExtra("address").toString()
        auth = FirebaseAuth.getInstance()
        orderID = generateOrderID()

        takeAwayTime = intent?.getStringExtra("takeAwayTime").toString()

        totalPaymentTV = findViewById(R.id.total_payment_tv)
        totalPaymentTV.text = "₹%.2f".format(subTotalPrice)

        cashPaymentRB = findViewById(R.id.cash_payment_radio_btn)
        walletsRB = findViewById(R.id.wallets_radio_btn)
        bhimUpiRB = findViewById(R.id.bhim_upi_radio_btn)
        netBankingRB = findViewById(R.id.net_banking_radio_btn)

        walletSection = findViewById(R.id.wallets_section_ll)
        bhimUpiSection = findViewById(R.id.bhim_upi_section_ll)

        setupPaymentButtons()

        findViewById<ImageView>(R.id.payment_go_back_iv).setOnClickListener { onBackPressed() }
    }
    private fun sendMail(){
        val mail = SendMail(
            "1805213035@ietlucknow.ac.in", "1805213035HBM",
            "pankajkumar14111998@gmail.com",
            auth.currentUser?.displayName ?.toString() + " has placed order and their order id is : "+orderID ,
            "Yes, it's working well\nI will use it always."
        )
        mail.execute()
        Toast.makeText(this,"Email send",Toast.LENGTH_LONG).show()
    }


    private fun setupPaymentButtons() {
        confirmPaymentBtn = findViewById(R.id.confirm_payment_btn)
        paymentRazorPayBtn = findViewById(R.id.payment_wallet_btn)
        paymentBhimUpiBtn = findViewById(R.id.payment_bhim_upi_btn)

        paymentRazorPayBtn.text = "Pay Securely ₹%.2f".format(subTotalPrice)
        paymentBhimUpiBtn.text = "Pay ₹%.2f".format(subTotalPrice)

        confirmPaymentBtn.setOnClickListener {
            orderDone()
        }
        paymentRazorPayBtn.setOnClickListener { doRazorPayPayment() }
        paymentBhimUpiBtn.setOnClickListener {
            Toast.makeText(this, "NOT AVAILABLE", Toast.LENGTH_SHORT).show()
        }
    }
    private fun doRazorPayPayment(){
        val activity: Activity = this
        val co = Checkout()
        val userID = auth.currentUser!!.email
        try {
            val options = JSONObject()
            options.put("name","Iet_Canteen")
            options.put("theme.color", "#3399cc");
            options.put("currency","INR");
            options.put("amount",subTotalPrice*100)//pass amount in currency subunits

            val prefill = JSONObject()
            prefill.put("email",userID)
            options.put("prefill",prefill)
            co.open(activity,options)
        }catch (e: Exception){
            Toast.makeText(activity,"Error in payment: "+ e.message,Toast.LENGTH_LONG).show()
            e.printStackTrace()
        }
    }

    fun chooseModeOfPayment(view: View) {
        var payMethod = ""
        payMethod = if(view is RadioButton) {
            ((view.parent as LinearLayout).getChildAt(1) as TextView).text.toString()
        } else {
            (((view as CardView).getChildAt(0) as LinearLayout).getChildAt(1) as TextView).text.toString()
        }

        cashPaymentRB.isChecked = false
        walletsRB.isChecked = false
        bhimUpiRB.isChecked = false
        netBankingRB.isChecked = false

        walletSection.visibility = ViewGroup.GONE
        bhimUpiSection.visibility = ViewGroup.GONE

        confirmPaymentBtn.visibility = ViewGroup.INVISIBLE

        when(payMethod) {
            getString(R.string.cash_payment) -> {
                cashPaymentRB.isChecked = true
                confirmPaymentBtn.visibility = ViewGroup.VISIBLE
            }
            getString(R.string.razor_pay) -> {
                walletsRB.isChecked = true
                walletSection.visibility = ViewGroup.VISIBLE
            }

            getString(R.string.bhim_upi) -> {
                bhimUpiRB.isChecked = true
                bhimUpiSection.visibility = ViewGroup.VISIBLE
            }
            getString(R.string.net_banking) -> {
                Toast.makeText(this, "NOT AVAILABLE", Toast.LENGTH_SHORT).show()
                netBankingRB.isChecked = true
            }
        }
    }

    private fun orderDone() {
        var paymentMethod = ""
        when {
            cashPaymentRB.isChecked -> paymentMethod = "Pending: Cash Payment"
            walletsRB.isChecked -> paymentMethod = "Paid: $selectedWallet Wallet"

            bhimUpiRB.isChecked -> paymentMethod = "Paid: $enteredUPI"
        }

        val intent = Intent(this, OrderDoneActivity::class.java)
        intent.putExtra("totalItemPrice", totalItemPrice)
        intent.putExtra("totalTaxPrice", totalTaxPrice)
        intent.putExtra("subTotalPrice", subTotalPrice)
        intent.putExtra("takeAwayTime", takeAwayTime)
        intent.putExtra("paymentMethod", paymentMethod)
        intent.putExtra("address",address)
        intent.putExtra("orderId",orderID)
        sendMail()
        startActivity(intent)
        finish()
    }
    private fun generateOrderID() : String{
        val r1: String = ('A'..'Z').random().toString() + ('A'..'Z').random().toString()
        val r2: Int = (10000..99999).random()
        orderID = "$r1$r2"
        return orderID
    }

    override fun onItemClick(position: Int) {
        for(i in 0 until savedCardItems.size) {
            savedCardItems[i].isSelected = false
        }
        savedCardItems[position].isSelected = true
        savedCardsRecyclerAdapter.notifyDataSetChanged()
    }

    override fun onItemPayButtonClick(position: Int) {
        selectedSavedCard = "XXXX${savedCardItems[position].cardNumber.substring(12,16)}, ${savedCardItems[position].cardHolderName}"
        orderDone()
    }

    override fun onPaymentSuccess(p0: String?) {
        orderDone()
        Toast.makeText(this,"Payment failed! $p0" , Toast.LENGTH_LONG).show()

    }

    override fun onPaymentError(p0: Int, p1: String?) {
        Toast.makeText(this,"Payment failed! $p1" , Toast.LENGTH_LONG).show()
    }
}