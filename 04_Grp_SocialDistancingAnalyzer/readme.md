#Authors
Alankrita Singh (B.Tech IT 2022, 1805213007)
Priya Adarsh  (B.Tech IT 2022, 1805213041) 
Swarnim Yadav (B.Tech IT 2022, 1805213059) 

Please refer to the added Features.
The gestures I trained are as given in the image below.

Use case: counting the number of people in the stores/buildings/shopping malls etc., in real-time.
Sending an alert to the staff if the people are way over the social distancing limits.
Optimizing the real-time stream for better performance (with threading).
Acts as a measure to tackle COVID-19.
Simple Theory
Object detection:

We will be using YOLOv3, trained on COCO dataset for object detection.
In general, single-stage detectors like YOLO tend to be less accurate than two-stage detectors (R-CNN) but are significantly faster.
YOLO treats object detection as a regression problem, taking a given input image and simultaneously learning bounding box coordinates and corresponding class label probabilities.
It is used to return the person prediction probability, bounding box coordinates for the detection, and the centroid of the person.
Distance calculation:

NMS (Non-maxima suppression) is also used to reduce overlapping bounding boxes to only a single bounding box, thus representing the true detection of the object. Having overlapping boxes is not exactly practical and ideal, especially if we need to count the number of objects in an image.
Euclidean distance is then computed between all pairs of the returned centroids. Simply, a centroid is the center of a bounding box.
Based on these pairwise distances, we check to see if any two people are less than/close to 'N' pixels apart.
Running Inference
Install all the required Python dependencies:
pip install -r requirements.txt
If you would like to use GPU, set USE_GPU = True in the config. options at 'mylib/config.py'.

Download the weights file and place it in the 'yolo' folder.

To run inference on a test video file, head into the directory/use the command:

python run.py -i mylib/videos/test.mp4
To run inference on an IP camera, Setup your camera url in 'mylib/config.py':
# Enter the ip camera url (e.g., url = 'http://191.138.0.100:8040/video')
url = ''
Then run with the command:
python run.py
Set url = 0 for webcam.