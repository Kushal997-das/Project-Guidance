from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_report', methods=['POST'])
def generate_report():
    try:
        # Get form data
        students_file = request.files['students_file']
        attendance_file = request.files['attendance_file']
        threshold = int(request.form['threshold'])/100

        def convert_to_seconds(duration_str):
            h, m, s = map(int, duration_str.split(':'))
            return h * 3600 + m * 60 + s

        # Read CSV files
        students_df = pd.read_csv(students_file)
        attendance_df = pd.read_csv(attendance_file)

        # Convert 'Time in Call' to total seconds
        attendance_df['total_seconds'] = attendance_df['Time in Call'].apply(convert_to_seconds)

        # Calculate threshold duration
        max_duration = attendance_df['total_seconds'].max()
        threshold_duration =  max_duration * threshold

        # Filter attendance data based on threshold
        filtered_attendance = attendance_df[attendance_df['total_seconds'] > threshold_duration]

        # Merge attendance data with student data
        merged_data = pd.merge(filtered_attendance, students_df, left_on='Full Name', right_on='Student Name', how='left')
        
        # Prepare report data
        report_data = merged_data[['Roll No', 'Full Name', 'Time in Call']]
        report_data.columns = ['roll_no', 'name', 'total_duration']
        report_data = report_data.to_dict(orient='records')

        return render_template('report.html', report_data=report_data)

    except Exception as e:
        error_message = f"Error: {str(e)}"
        return render_template('index.html', error=error_message)

if __name__ == '__main__':
    app.run(debug=True)
