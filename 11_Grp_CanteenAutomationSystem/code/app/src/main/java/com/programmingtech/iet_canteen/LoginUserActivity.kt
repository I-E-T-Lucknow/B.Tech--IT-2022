package com.programmingtech.iet_canteen

import android.content.DialogInterface
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.Patterns
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.appcompat.app.AlertDialog
import com.google.android.material.textfield.TextInputLayout
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.PhoneAuthOptions
import com.google.firebase.auth.PhoneAuthProvider
import com.google.firebase.database.*
import java.util.*
import java.util.concurrent.TimeUnit

class LoginUserActivity : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth
    private lateinit var databaseRef: DatabaseReference

    private lateinit var emailTIL: TextInputLayout
    private lateinit var passwordTIL: TextInputLayout
    private lateinit var mobileTIL : TextInputLayout
    private var doubleBackToExit = false
    private var emailEntered : Boolean = true

    // added for next button
    private lateinit var emailAndNumberLayout : LinearLayout
    private lateinit var passwordLayout : LinearLayout
    private lateinit var otpLayout : LinearLayout
    private lateinit var nextLayout : LinearLayout
    private lateinit var otpTIL : TextInputLayout

    //added for otp verification
    private var storeVerificationId : String? = ""
    private lateinit var resendToken : PhoneAuthProvider.ForceResendingToken
    private lateinit var callbacks : PhoneAuthProvider.OnVerificationStateChangedCallbacks

    override fun onBackPressed() {
        if(doubleBackToExit) {
            super.onBackPressed()
            return
        }
        doubleBackToExit = true
        Toast.makeText(this, "Press again to exit", Toast.LENGTH_SHORT).show()
        Handler().postDelayed({ doubleBackToExit = false }, 2000)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login_user)

        auth = FirebaseAuth.getInstance()
        databaseRef = FirebaseDatabase.getInstance().reference

        emailTIL = findViewById(R.id.login_email_til)
        passwordTIL = findViewById(R.id.login_password_til)
        passwordLayout = findViewById(R.id.password_ll)
        otpLayout = findViewById(R.id.otp_ll)
        emailAndNumberLayout = findViewById(R.id.numberAndMailLL)
        nextLayout = findViewById(R.id.nextClickedLL)
        mobileTIL = findViewById(R.id.login_mobile_til)
        otpTIL = findViewById(R.id.login_otp_til)

        findViewById<TextView>(R.id.login_forgot_password_tv).setOnClickListener {userForgotPassword()}
    }

    //Checking if user is logged in already or not
    override fun onStart() {
        super.onStart()
        val user = auth.currentUser
        if(user != null && user.isEmailVerified) {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
    }

    private fun validateEmail(): Boolean {
        val email = emailTIL.editText!!.text.toString().toLowerCase(Locale.ROOT).trim()
        if(email.isEmpty()) {
            emailTIL.error = getString(R.string.field_empty)
            return false
        }
        if(!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            emailTIL.error = getString(R.string.invalid_email)
            return false
        }
        if(!email.endsWith("ietlucknow.ac.in")){
            emailTIL.error = "Enter Valid IET Domain Email Address"
            return false
        }
        emailTIL.error = null
        return true
    }

    private fun validatePassword(): Boolean {

        val pass = passwordTIL.editText!!.text.toString().trim()

        if(pass.isEmpty()) {
            passwordTIL.error = getString(R.string.field_empty)
            return false
        }

        if(pass.length < 6) {
            passwordTIL.error = "Password is too short (Min. 6 Characters)"
            return false
        }
        passwordTIL.error = null
        return true
    }
    fun validateNumber() : Boolean{
        val number = mobileTIL.editText!!.text.toString().trim()

        if(number.isEmpty()) {
            mobileTIL.error = getString(R.string.field_empty)
            return false
        }

        if(number.length < 10 || number.length > 10) {
            mobileTIL.error = "Invalid number"
            return false
        }

        mobileTIL.error = null
        return true
    }
    fun validateOTP() : Boolean{
        val otp  = otpTIL.editText!!.text.toString().trim()

        if(otp.isEmpty()) {
            otpTIL.error = getString(R.string.field_empty)
            return false
        }

        if(otp.length != 6) {
            otpTIL.error = "Invalid OTP"
            return false
        }

        otpTIL.error = null
        return true
    }

    fun loginEmployee(view: View) {

        if(emailEntered and !validatePassword()){
            return
        }else if(!emailEntered and !validateOTP()){
            return
        }
        findViewById<ProgressBar>(R.id.login_progress_bar).visibility = ViewGroup.VISIBLE
        if(emailEntered){
            auth.signInWithEmailAndPassword(emailTIL.editText!!.text.toString(), passwordTIL.editText!!.text.toString())
                .addOnCompleteListener(this) { task ->
                    if(task.isSuccessful) {

                        if(auth.currentUser!!.isEmailVerified) {
                            checkGenderSavedOrNot()
                        } else {
                            findViewById<ProgressBar>(R.id.login_progress_bar).visibility = ViewGroup.INVISIBLE
                            AlertDialog.Builder(this)
                                .setTitle("Email Verification")
                                .setMessage("Please verify your Email address.\nA verification link has been sent to your Email address")
                                .setPositiveButton("OK", DialogInterface.OnClickListener { dialogInterface, _ ->
                                    dialogInterface.dismiss()
                                })
                                .setCancelable(false)
                                .create()
                                .show()
                        }
                    }
                }

                .addOnFailureListener {
                    AlertDialog.Builder(this)
                        .setTitle("Attention")
                        .setMessage("${it.message}")
                        .setPositiveButton("OK", DialogInterface.OnClickListener { dialogInterface, _ ->
                            dialogInterface.dismiss()
                        })
                        .setCancelable(false)
                        .create()
                        .show()
                    findViewById<ProgressBar>(R.id.login_progress_bar).visibility = ViewGroup.INVISIBLE
                }
        }
        else {

        }
    }

    private fun checkGenderSavedOrNot() {
        val user = auth.currentUser!!
        val empName = user.displayName!!

        databaseRef.child("customers")
            .child(user.uid).addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    val empGender = snapshot.child("gender").value.toString()
                    if(empGender == "none") {
                        val intent = Intent(this@LoginUserActivity, GenderSelectionActivity::class.java)
                        intent.putExtra("name", empName)
                        intent.putExtra("uid", user.uid)
                        startActivity(intent)
                        finish()
                    } else {
                        startActivity(Intent(this@LoginUserActivity, MainActivity::class.java))
                        finish()
                        Toast.makeText(this@LoginUserActivity, "Welcome to Iet Canteen", Toast.LENGTH_SHORT).show()
                    }
                }
                override fun onCancelled(error: DatabaseError) {}
            })
    }

    fun openRegisterActivity(view: View) {
        startActivity(Intent(this, RegisterUserActivity::class.java))
        finish()
    }

    private fun userForgotPassword() {
        val forgotDialog = ForgotPassword()
        forgotDialog.show(supportFragmentManager, "Forgot Password Dialog")
    }

    fun loginNext(view: View) {
        val mobileNumber = mobileTIL.editText!!.text.toString().trim()
        val email = emailTIL.editText!!.text.toString().toLowerCase(Locale.ROOT).trim()
        if(email.isNotEmpty()){
            emailAndNumberLayout.visibility = View.GONE
            nextLayout.visibility = View.VISIBLE
            otpLayout.visibility = View.GONE
        }else if(mobileNumber.isNotEmpty()){
            emailAndNumberLayout.visibility = View.GONE
            nextLayout.visibility = View.VISIBLE
            passwordLayout.visibility = View.GONE
            emailEntered = false
        }else{
            Toast.makeText(this,"Please Enter Email Or Mobile Number",Toast.LENGTH_LONG).show()
        }
    }
    fun sendOtp(){

    }
    fun setDefaults(view: View) {
        emailAndNumberLayout.visibility = View.VISIBLE
        nextLayout.visibility = View.GONE
        passwordLayout.visibility = View.VISIBLE
        otpLayout.visibility = View.VISIBLE
        emailEntered = true
    }
}