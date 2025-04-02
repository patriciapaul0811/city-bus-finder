<?php
// process_signup.php

// Start session if not already started
session_start();

// Define database connection variables
$servername = "localhost";
$username = "db_username";
$password = "db_password";
$dbname = "bus_tracker_db";

// Function to sanitize input data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize
    $fullName = sanitizeInput($_POST['fullName']);
    $email = sanitizeInput($_POST['email']);
    $password = $_POST['password']; // Will be hashed, don't sanitize
    $phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
    $termsAgree = isset($_POST['termsAgree']) ? 1 : 0;
    
    // Validate required fields
    $errors = [];
    
    if (empty($fullName)) {
        $errors[] = "Full name is required";
    }
    
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($password)) {
        $errors[] = "Password is required";
    } elseif (strlen($password) < 8) {
        $errors[] = "Password must be at least 8 characters";
    } elseif (!preg_match('/[A-Za-z]/', $password) || !preg_match('/\d/', $password)) {
        $errors[] = "Password must contain both letters and numbers";
    }
    
    if (!$termsAgree) {
        $errors[] = "You must agree to the terms and conditions";
    }
    
    // If no validation errors, proceed with registration
    if (empty($errors)) {
        try {
            // Create database connection
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // Set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Check if email already exists
            $stmt = $conn->prepare("SELECT id FROM users WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                // Email already exists
                $_SESSION['signup_error'] = "Email address already registered";
                header("Location: signup.html");
                exit();
            }
            
            // Hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Create user record
            $stmt = $conn->prepare("INSERT INTO users (full_name, email, password, phone, terms_agreed, created_at) 
                                   VALUES (:fullName, :email, :password, :phone, :termsAgree, NOW())");
            
            $stmt->bindParam(':fullName', $fullName);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':termsAgree', $termsAgree);
            
            $stmt->execute();
            
            // Registration successful
            $_SESSION['signup_success'] = true;
            $_SESSION['user_email'] = $email;
            
            // Redirect to login page with success message
            header("Location: login.html?signup=success");
            exit();
            
        } catch(PDOException $e) {
            // Handle database errors
            $_SESSION['signup_error'] = "Registration failed: " . $e->getMessage();
            header("Location: signup.html");
            exit();
        }
        
        // Close connection
        $conn = null;
    } else {
        // Store errors in session and redirect back to form
        $_SESSION['signup_errors'] = $errors;
        header("Location: signup.html");
        exit();
    }
} else {
    // If not a POST request, redirect to signup page
    header("Location: signup.html");
    exit();
}
?>