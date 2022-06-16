

## Traffic sign recognition using CNN


 

## Introduction

Traffic sign detection and classification is an important technology, as it helps drivers in
understanding signs and following traffic rules, as well as contributing to the development of
autonomous driving systems. There are so many road accidents also due to mis-interpreted traffic signal by
human due to fatigue, bad weather or any other human limitations. To dodge this, we have tried to
implement an open source software which recognises traffic signals. 

Our final year project, done under the guidance of Prof. Vineet Kansal and 
Dr. Aditi Sharma is based on the Traffic sign Recognition. 
We have created an application which uses CNN for detecting and classifying traffic signal using OpenCV.

This project acts as an sign detector which opens up the camera of the system installed 
and detects and recognises traffic signal. As soon as a recognised 
sign is seen in the application, it automatically displays the recognition in the camera,
meanwhile classifying the sign to a particular class.
 
 
## Installation

Make sure you have brew installed on your system.

- Install Pip or Upgrade it
  
   ```
   pip install --upgrade pip wheel
   ```
   
- Install Python 2.7 on your system.

    ```
      pip install python@2
    ```

- Update your path variables accordingly

    ```
      export PATH="/usr/local/sbt/python@2/libexec/bin:$PATH"
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
      pip install opencv, tkinter, SkLearn
    ```

Now, the project is ready to run.

## Run Locally

After following the above steps for installation, type the command below to run the project.

  ```bash
    python deployment_on_webcam+image.py
  ```
  
The project is running now.


## Tech Stack

**Language:** Python

**Libraries:** OpenCV, Tkinter, NumPy, Pandas, SkLearn, Matplotlip

## Machine Learning Models Used

**Traffic Sign Recognition :**  CNN


## Authors

- Vivek Pandey(B.Tech. IT-2022 - 1900520139006)
- Tehreem Arshad (B.Tech. IT-2022 - 1900520139005)
- Srishti Kashyap(B.Tech. IT-2022 - 1900520139004)





