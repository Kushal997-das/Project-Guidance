The Virtual Classes Attendance Automation System is a web-based application developed using Flask, a Python web framework, to automate the process of generating attendance reports for virtual classes. This system allows users to upload two CSV files containing student information and attendance records, specify a minimum duration threshold for attendance, and generate a detailed report based on the provided criteria.
## Deployment

Check out the live deployment of this project [here](https://virtual-classes-attendance-automation.onrender.com).

Key features of the system include:
File Upload: Users can upload CSV files containing student information (`students_file`) and attendance records (`attendance_file`) directly through the web interface.
Threshold Setting: The system allows users to specify a minimum duration threshold (in seconds) for considering a student's attendance as valid. This threshold helps filter out short attendance durations.
Data Processing: Upon form submission, the system processes the uploaded CSV files, converts the 'Time in Call' duration to total seconds, and filters the attendance data based on the specified threshold.
Data Merge and Reporting: The system merges the filtered attendance data with student information based on matching names. It then generates a report containing relevant details such as roll number, student name, and total duration of attendance in hours, minutes, and seconds format.
User Interaction: After generating the report, users can view the attendance details in a formatted HTML table (`report.html`). The report page includes a button that allows users to reset and return to the initial form (`index.html`) for further processing.
This system streamlines the attendance tracking process for virtual classes, providing educators and administrators with a convenient tool to analyze student participation and ensure accurate attendance records. The use of Flask enables rapid development and deployment of the web application, making it accessible and user-friendly for both teachers and students.
By leveraging Python's pandas library for data manipulation and Flask for web development, the Virtual Classes Attendance Automation System offers a practical solution to enhance efficiency in managing virtual class attendance.
