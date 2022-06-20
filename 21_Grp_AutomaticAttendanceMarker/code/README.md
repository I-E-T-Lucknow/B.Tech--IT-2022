
# Automated Attendance Marker - IET Lucknow

During the era of proxy, we need a solution to mark the attendance of only those who 
are actually attending classes. This required costly equipment like fingerprint scanners or 
manual check for each student, which is not always feasible. To dodge this, we have tried to
implement an open source software which recognises people with their faces.

Our final year project, done under the guidance of Prof. D.S. Yadav and 
Ms. Deepali Avasthi is based on the Face Detection and Recognition. 
We have created an application which combines the features of Haar Cascase Classifier
for Face Detection and Local Binary Pattern Histograms for Face Recognition using OpenCV.

This project acts as an Attendance Marker which opens up the camera of the system installed 
and detects and recognises faces of students of IET Lucknow. As soon as a recognised 
face is seen in the application, it automatically displays the recognition in the camera,
meanwhile marking the attendance of the student in an Excel Sheet in the 
background. This way, the attendance of a classroom is recorded real time using Faces of students 
and updated in the Excel sheet. 


## Installation

Make sure you have brew installed on your system. If not, follow the steps [here](https://brew.sh) to do so.

- Install Python 2.7 on your system.

    ```
      brew install python@2
    ```

- Update your path variables accordingly

    ```
      export PATH="/usr/local/opt/python@2/libexec/bin:$PATH"
    ```

- Install Conda on your system. This is essential for our libraries to work later.

- Install Visual Studio Code by following the steps given in Conda.

- Clone the project (or copy the folder to your local)

    ``` 
      git clone https://www.github.com/link-to-project.git
    ```

- Go to the project directory

    ```
      cd my-project
    ```

- Install dependencies

    ```
      pip install opencv, tkinter
    ```

Now, the project is ready to run.

## Run Locally

After following the above steps for installation, type the command below to run the project.

  ```bash
    python train.py
  ```
  
The project is running now.


## Tech Stack

**Language:** Python

**Libraries:** OpenCV, Tkinter, NumPy, Pandas

## Machine Learning Models Used

**Face Detection:** Haar Cascade Classifier

**Face Recognition:** Local Binary Pattern Histograms (LBPH) Algorithm




## Authors

- Kushagra Srivastava (B.Tech. IT-2022 - 1805213028) [[Resume](https://bit.ly/kushagra-sde), [LinkedIn](https://www.linkedin.com/in/kushagrasri), [GitHub](https://Github.com/Kushagrasri)]
- Mohammad Kashif Khan (B.Tech. IT-2022 - 1805213030) [[Resume](https://bit.ly/kashif-sde), [LinkedIn](https://www.linkedin.com/in/mohammad-kashif-khan-0521a21b5/), [GitHub](https://Github.com/kashif007k18)]
- Riyansh Pal (B.Tech. IT-2022 - 1805213046) [[Resume](https://bit.ly/riyansh16_), [LinkedIn](https://www.linkedin.com/in/riyansh16), [GitHub](https://github.com/riyansh16)]

