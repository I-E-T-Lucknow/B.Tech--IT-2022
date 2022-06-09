package com.programmingtech.iet_canteen

import adapters.RecyclerOrderItemAdapter
import android.app.AlertDialog
import android.app.TimePickerDialog
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.content.SharedPreferences
import android.location.Address
import android.location.Geocoder
import android.location.Location
import android.location.LocationManager
import android.os.Bundle
import android.provider.Settings
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import datamodels.CartItem
import services.DatabaseHandler
import java.text.SimpleDateFormat
import java.util.*

class UserMenuOrderActivity : AppCompatActivity(), RecyclerOrderItemAdapter.OnItemClickListener, TimePickerDialog.OnTimeSetListener {

    private lateinit var itemRecyclerView: RecyclerView
    private lateinit var recyclerAdapter: RecyclerOrderItemAdapter

    private lateinit var totalItemsTV: TextView
    private lateinit var totalPriceTV: TextView
    private lateinit var totalTaxTV: TextView
    private lateinit var subTotalTV: TextView
    private lateinit var proceedToPayBtn: Button
    private lateinit var orderTakeAwayTV: TextView
    private lateinit var addressET: EditText
    private lateinit var progressBar : ProgressBar


    private var totalPrice: Float = 0F
    private var totalItems: Int = 0
    private var totalTax: Float = 0F

    override fun onBackPressed() {
        AlertDialog.Builder(this)
            .setIcon(R.drawable.ic_alert)
            .setTitle("Alert!")
            .setMessage("Do you want to cancel your order?")
            .setPositiveButton("Yes", DialogInterface.OnClickListener {_, _ ->
                super.onBackPressed()
            })
            .setNegativeButton("No", DialogInterface.OnClickListener {dialogInterface, _ ->
                dialogInterface.dismiss()
            })
            .create().show()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user_menu_order)

        totalItemsTV = findViewById(R.id.order_total_items_tv)
        totalPriceTV = findViewById(R.id.order_total_price_tv)
        totalTaxTV = findViewById(R.id.order_total_tax_tv)
        subTotalTV = findViewById(R.id.order_sub_total_tv)
        proceedToPayBtn = findViewById(R.id.proceed_to_pay_btn)
        orderTakeAwayTV = findViewById(R.id.order_take_away_time_tv)
        addressET = findViewById(R.id.addressET)
        progressBar = findViewById(R.id.addressProgressBar)

        totalPrice = intent.getFloatExtra("totalPrice", 0F)
        totalItems = intent.getIntExtra("totalItems", 0)
        if(totalPrice < 100){
            totalTax =  10.00f
        }else{
            totalTax =  0.00f
        }


        loadOrderDetails()
        loadRecyclerAdapter()

        val c = Calendar.getInstance()
        c.add(Calendar.MINUTE, 5)
        onTimeSet(TimePicker(this), c.get(Calendar.HOUR_OF_DAY), c.get(Calendar.MINUTE))

        findViewById<ImageView>(R.id.user_menu_order_help_iv).setOnClickListener {
            startActivity(Intent(this, ContactUsActivity::class.java))
        }
    }

    private fun loadOrderDetails() {
        totalItemsTV.text = "$totalItems items"
        totalPriceTV.text = "₹%.2f".format(totalPrice)
        totalTaxTV.text = "₹%.2f".format(totalTax)
        subTotalTV.text = "₹%.2f".format(totalPrice+totalTax)
        proceedToPayBtn.text = "Proceed to Pay ₹%.2f".format(totalPrice+totalTax)
    }

    private fun loadRecyclerAdapter() {
        val sharedPref: SharedPreferences = getSharedPreferences("settings", MODE_PRIVATE)
        val orderedItems: ArrayList<CartItem> = ArrayList()

        for (item in DatabaseHandler(this).readCartData()) {
            orderedItems.add(item)
        }

        itemRecyclerView = findViewById(R.id.order_recycler_view)
        recyclerAdapter = RecyclerOrderItemAdapter(
            applicationContext,
            orderedItems,
            totalItemsTV,
            totalItems,
            totalPriceTV,
            totalPrice,
            totalTaxTV,
            totalTax,
            subTotalTV,
            proceedToPayBtn,
            sharedPref.getInt("loadItemImages", 0),
            this
        )

        itemRecyclerView.adapter = recyclerAdapter
        itemRecyclerView.layoutManager = LinearLayoutManager(this)

        recyclerAdapter.notifyItemRangeInserted(0, orderedItems.size)
    }

    fun changeOrderTakeAwayTime(view: View) {
        val c = Calendar.getInstance()
        val hour = c.get(Calendar.HOUR)
        val minute = c.get(Calendar.MINUTE)
        val timePickerDialog = TimePickerDialog(this, this, hour, minute, true)
        timePickerDialog.show()
    }

    override fun onTimeSet(p0: TimePicker?, hourOfDay: Int, minute: Int) {
        val time = "$hourOfDay:$minute"
        val f24Hours = SimpleDateFormat("HH:mm")
        try {
            val date = f24Hours.parse(time)
            val f12Hours = SimpleDateFormat("hh:mm aa")
            orderTakeAwayTV.text = f12Hours.format(date)
        } catch (e: Exception) {}
    }

    fun goBack(view: View) {onBackPressed()}

    override fun emptyOrder() {
        AlertDialog.Builder(this)
                .setMessage("Your order is now empty. Add some items from the food menu and place the order.")
                .setPositiveButton("Ok", DialogInterface.OnClickListener { _, _ ->
                    val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                })
                .setCancelable(false)
                .create().show()
    }

    fun openPaymentActivity(view: View) {
        val address : String =  addressET.text.toString().trim()
            if(address.length<=0){
                addressET.error = "Address can't be empty"
                return
            }
        val intent = Intent(this, PaymentActivity::class.java)
        intent.putExtra("totalItemPrice", recyclerAdapter.getTotalItemPrice())
        intent.putExtra("totalTaxPrice", recyclerAdapter.getTotalTax())
        intent.putExtra("subTotalPrice", recyclerAdapter.getSubTotalPrice())
        intent.putExtra("takeAwayTime", orderTakeAwayTV.text.toString())
        intent.putExtra("address",address)
        startActivity(intent)
    }

    fun getLocation(view: View) {
        addressET.visibility = View.GONE
        progressBar.visibility = View.VISIBLE
        getAddressInfo()
    }

    private fun getAddressInfo(){
        isLocationEnabled(this)
        LocationHelper().startListeningUserLocation(this , object : LocationHelper.MyLocationListener {
            override fun onLocationChanged(location: Location) {
                // Here you got user location :)
                val latitude = location.latitude
                val longitude = location.longitude
                val geocoder = Geocoder(this@UserMenuOrderActivity, Locale.getDefault())
                val addresses: List<Address> = geocoder.getFromLocation(latitude,longitude, 1)
                val address: String = addresses[0].getAddressLine(0)
                addressET.visibility = View.VISIBLE
                progressBar.visibility = View.GONE
                addressET.setText("$address")
            }
        })
    }
    fun isLocationEnabled(context: Context) {
        val lm = context.getSystemService(LOCATION_SERVICE) as LocationManager
        var gps_enabled = false
        var network_enabled = false
        try {
            gps_enabled = lm.isProviderEnabled(LocationManager.GPS_PROVIDER)
        } catch (ex: Exception) {
        }
        try {
            network_enabled = lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER)
        } catch (ex: Exception) {
        }
        if (!gps_enabled && !network_enabled) {
            // notify user
            AlertDialog.Builder(context)
                .setMessage("Gps is disabled")
                .setPositiveButton(
                    "Open Location Settings"
                ) { paramDialogInterface, paramInt -> context.startActivity(Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)) }
                .setNegativeButton("Cancel", null)
                .show()
        }
    }
}