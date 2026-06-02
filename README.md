# SMART GRADE v4.0 Ultimate

## Complete Grade Management System

SIN GBHS FOUMBAN - Form 4B Science | Academic Year 2025-2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [Technology Stack](#3-technology-stack)
4. [Architecture](#4-architecture)
5. [Installation](#5-installation)
6. [Usage Guide](#6-usage-guide)
7. [API Reference](#7-api-reference)
8. [Badges System (23 Badges)](#8-badges-system-23-badges)
9. [Themes & Fonts](#9-themes--fonts)
10. [Developer](#10-developer)
11. [License](#11-license)
12. [GitHub Repository](#12-github-repository)

---

## 1. Project Overview

SMART GRADE is a complete Progressive Web Application (PWA) for grade management, designed specifically for SIN GBHS FOUMBAN Form 4B Science students. The application works 100% offline after first installation and stores all data locally on the user's device.

School Information:
- Name: SIN GBHS FOUMBAN
- Class: Form 4B Science
- Academic Year: 2025-2026
- Location: Foumban, West Region, Cameroon

Key Numbers:
- 14 Subjects
- 6 Sequences / 3 Terms
- 23 Achievement Badges
- 20 Themes + 12 Fonts

---

## 2. Features

Academic Features
- 14 subjects with customizable coefficients (1-10)
- 6 sequences per year (2 per term)
- 3 terms per academic year
- Smart rounding and compensation system
- Advanced statistics and predictions
- Yearly report with letter grades (A+, A, B+, B, C, D, F)

Analytics and Visualization
- Interactive bar charts using Chart.js
- Radar charts for subject comparison
- Grade distribution doughnut chart
- Zoomable progress charts
- Performance trends analysis

Study Tools
- Flashcards for each subject (default + custom)
- Personal goals system with progress bars
- Class timetable viewer
- Achievement badges (23 total)
- Streak tracking for daily usage

Security
- Fingerprint login using WebAuthn API
- 4-digit PIN security
- Data stored locally (no external servers)

Export and Transfer
- Export to JSON (complete backup)
- Export to CSV (spreadsheet format)
- Export to HTML (viewable report)
- Export to PDF (professional report card)
- Import from JSON backup
- QR code data transfer
- 6-digit local transfer code

Premium Features
- PDF Export (Professional report cards)
- Cloud Backup (Auto sync with JSONBin.io)
- Advanced Statistics
- Unlimited Flashcards
- Priority Support

---

## 3. Technology Stack

Frontend
- HTML5 (Semantic Markup, LocalStorage API, Canvas API, MediaDevices API, Notification API)
- CSS3 (Flexbox, Grid Layout, CSS Variables, Glassmorphism, Media Queries)
- JavaScript ES6+ (Promises, Async/Await, LocalStorage Database Management)

Libraries
- Chart.js v4.4.0 for interactive charts
- chartjs-plugin-zoom for zoomable graphs
- html2pdf.js v0.10.1 for PDF generation
- QRCode.js for QR code generation
- html5-qrcode for QR code scanning

PWA
- Service Worker for offline caching
- Web App Manifest for installation
- WebAuthn API for biometric authentication

Icons and Fonts
- Font Awesome 6.5.1 for icons
- Google Fonts (12 families: Inter, Roboto, Cinzel, Quicksand, Courier Prime, Fredoka, Pacifico, Bangers, Lobster, Permanent Marker, Comfortaa, Righteous)

---

## 4. Architecture

File Structure

/
+-- index.html                 Home page with account list
+-- login.html                 PIN + Fingerprint authentication
+-- register.html              Account creation
+-- dashboard.html             Main dashboard with statistics
+-- add-grade.html             Grade entry interface
+-- subjects.html              Subject management
+-- term1.html / term2.html / term3.html   Term reports
+-- yearly.html                Yearly summary
+-- statistics.html            Charts and analytics
+-- achievements.html          Badges and streaks
+-- flashcards.html            Study cards
+-- goals.html                 Academic goals
+-- timetable.html             Class schedule
+-- profile.html               User profile with avatar
+-- settings.html              App settings
+-- export.html                JSON, CSV, HTML, PDF export
+-- backup.html                Backup manager
+-- history.html               Activity log
+-- notifications.html         Notification center
+-- transfer.html              QR code and local transfer
+-- support.html               Help and support
+-- guide.html                 Public user guide
+-- guide-user.html            Private user guide
+-- about.html                 Public about page
+-- about-user.html            Private about page
+-- terms.html                 Terms of Use
+-- privacy.html               Privacy Policy
+-- cookies.html               Cookies Policy
+-- license.html               MIT License
+-- eula.html                  End User License Agreement
+-- doc.html                   Developer documentation
+-- remend.md                  This file - Complete description
+-- splash.html                Loading screen
+-- welcome.html               Post-login welcome
+-- 400.html / 401.html / 403.html / 404.html / 500.html / 502.html / 503.html   Error pages

css/
+-- base.css                   Reset, variables, animations
+-- layout.css                 Header, sidebar, modals
+-- components.css             Cards, buttons, forms
+-- themes.css                 20 color themes
+-- night-mode.css             Dark mode styles

js/
+-- utils.js                   Core utilities (toast, dates, calculations)
+-- database.js                localStorage CRUD operations
+-- auth.js                    PIN and WebAuthn authentication
+-- app.js                     UI initialization (themes, fonts, menu)
+-- transfer.js                QR code and local transfer
+-- confirm-dialog.js          Custom confirmation dialogs
+-- install-handler.js         PWA installation
+-- auto-save.js               Auto-save every 30 seconds
+-- auto-update.js             Version checking
+-- cloud-sync.js              Cloud backup (JSONBin.io)
+-- pwa.js                     PWA configuration

PWA
+-- manifest.json              PWA manifest
+-- sw.js                      Service Worker
+-- icon.svg                   App icon

---

## 5. Installation

Android (Chrome)
1. Open SMART GRADE in Chrome browser
2. Tap the menu button (three dots) at top right
3. Select Add to Home Screen or Install App
4. Tap Install to add SMART GRADE to your home screen

iOS (Safari)
1. Open SMART GRADE in Safari browser
2. Tap the Share button at bottom
3. Scroll down and tap Add to Home Screen
4. Tap Add to install

Desktop (Chrome/Edge)
1. Open SMART GRADE in Chrome or Edge
2. Click the install icon in the address bar
3. Click Install to add to your applications

Git Clone
git clone https://github.com/hanskepper/SMART-GRADE-V4.-Ultimate..git

cd SMART-GRADE-V4.-Ultimate.

open index.html

---

## 6. Usage Guide

Getting Started
- Create an account on the Register page
- Set your 4-digit PIN (keep it secure)
- Select subjects for each term in Settings
- Start adding grades on the Add Grade page

Tracking Progress
- Dashboard shows overall averages and stats
- Term pages show detailed subject averages
- Statistics page for interactive charts
- Achievements page for badge progress
- Yearly page for complete year summary

Customization
- Tap the Theme button in top right corner
- Choose from 20 color themes
- Select from 12 font families
- Night mode activates automatically from 8pm to 6am
- Add profile photo from gallery in Profile page

Data Management
- Grades auto-save every 30 seconds
- Export data to JSON, CSV, HTML, or PDF
- Create backups in Backup page
- Restore from previous backups
- Transfer data between devices using QR codes

---

## 7. API Reference

Student Management

getAllStudents()
Returns array of all registered students

getStudentById(id)
Returns student object for given ID

createStudentAccount(name, number, class, pin)
Creates a new student account

deleteStudent(id)
Deletes student and all associated data

Grade Management

getStudentGrades(id)
Returns array of all grades for a student

saveStudentGrades(id, grades)
Saves grades array to localStorage

calculateStudentTermAverage(id, term)
Returns term average (0 to 20)

calculateYearlyAverage(id)
Returns yearly average (0 to 20)

calculateSubjectTermAverage(subjectId, term, grades)
Returns subject average for given term

getGradeLetter(avg)
Returns letter grade (A+, A, B+, B, C, D, F)

getStatusText(avg)
Returns text status (Excellent, Very Good, Good, etc.)

Subjects Management

getStudentSelectedSubjects(id, term)
Returns array of selected subject IDs

saveStudentSelectedSubjects(id, term, subjects)
Saves subject selection for a term

getSubjectCoefficients(id)
Returns coefficients object for a student

getSubjectCoefficient(id, subjectId)
Returns coefficient for a specific subject

Achievements Management

getStudentAchievements(id)
Returns achievements array for a student

unlockBadgeById(studentId, badgeId)
Unlocks a specific badge by ID

checkAndUnlockAllNewBadges(studentId)
Checks and unlocks all available badges

Streak Management

getStudentStreak(id)
Returns streak object with days and lastLogin

updateStreakOnVisit(id)
Updates streak when user logs in

Profile Management

getProfile(studentId)
Returns profile object with avatarBase64, bio, favorites

saveProfile(studentId, profile)
Saves profile data to localStorage

Export and Import

exportCompleteUserData(studentId)
Exports all user data as JSON string

importCompleteUserData(studentId, jsonData)
Imports data from JSON backup

Flashcards Management

getFlashcards(studentId)
Returns flashcards array

saveFlashcards(studentId, cards)
Saves flashcards to localStorage

Goals Management

getGoalsDetail(studentId)
Returns goals detail object

saveGoalsDetail(studentId, goals)
Saves goals detail to localStorage

---

## 8. Badges System (23 Badges)

Streak Badges (Auto-unlock)
- Beginner Streak: Use the app for 3 consecutive days
- Regular Streak: Use the app for 7 consecutive days
- Dedicated Streak: Use the app for 15 consecutive days
- Legendary Streak: Use the app for 30 consecutive days

Achievement Badges
- First Grade: Add your very first grade
- Perfect Score: Get 20/20 in any subject
- High Average: Overall average 12/20 and above
- Bookworm: Record 10+ grades
- Dedication: Record 30+ grades
- Scholar: Unlock 8 achievements
- Rising Star: Improve by 1+ point in a term
- Unstoppable: All 3 terms have grades entered
- Subject Completion: Add grades in all subjects of a term
- Active Semester: Complete a full term (all sequences)
- Discipline Mastery: Average above 15 in one subject
- Study Progress: Record 25+ grades
- Full Achievement: Unlock all 13 badges
- Excellent Result: Get 20/20 in a subject
- Comeback King: Go from below 10/20 to above 14/20 in any subject
- Theme Collector: Try 10 different themes
- Photo Uploader: Add a profile photo
- Welcome Aboard: First login after installation
- Font Collector: Try 6 different fonts
- Timetable Viewer: View timetable 10 times
- Flashcard Beginner: Create 5 custom flashcards
- Flashcard Master: Create 10 custom flashcards

---

## 9. Themes & Fonts

20 Color Themes

default (Deep Teal)      #0f3b48
crimson                  #c0392b
forest                   #1e8449
ocean                    #006994
royal                    #6c3483
sunset                   #d35400
rose                     #c44569
turquoise                #00897b
amber                    #b7950b
graphite                 #455a64
lavender                 #7b1fa2
cherry                   #b71c1c
midnight                 #1a237e
mint                     #00b894
coral                    #e74c3c
indigo                   #283593
chocolate                #5d4037
electric                 #6a1b9a
steel                    #37474f
lime                     #558b2f

12 Font Families
- Inter
- Roboto
- Cinzel
- Quicksand
- Courier Prime
- Fredoka
- Pacifico
- Bangers
- Lobster
- Permanent Marker
- Comfortaa
- Righteous

Night Mode
- Activates automatically between 8pm and 6am
- Can be manually toggled via Theme button

---

## 10. Developer

Name: HANS KEPPER
Email: hanskepper52@gmail.com
WhatsApp: +237 698 640 885
GitHub: hanskepper
Country: Cameroon

Education
School: SIN GBHS FOUMBAN
Class: Form 4B Science
Year: 2025-2026
Specialization: Web Developer specialized in Web Applications

---

## 11. License

MIT License

Copyright (c) 2025-2026 HANS KEPPER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 12. GitHub Repository

Repository URL
https://github.com/hanskepper/SMART-GRADE-V4.-Ultimate.

Live Demo
https://hanskepper.github.io/SMART-GRADE-V4.-Ultimate./

Clone Command
git clone https://github.com/hanskepper/SMART-GRADE-V4.-Ultimate..git

cd SMART-GRADE-V4.-Ultimate.

open index.html

---

Created: May 2026
Version: 4.0.3 Ultimate
School: SIN GBHS FOUMBAN - Form 4B Science
Developer: HANS KEPPER
