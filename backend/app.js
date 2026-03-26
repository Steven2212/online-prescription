const express = require("express")
const cors = require('cors');
const app = express()

//Body Parser
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"));

//Health check route.
app.get("/", (req, res) => {
    res.send("Online Prescription running")
})

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/consultations", require("./routes/consultationRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));


//404 Handler
app.use((req, res, next) => {
    console.log('Route not found')
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

//Global Error Handler
app.use((err, req, res, next) => {
    console.error(err)

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

module.exports = app