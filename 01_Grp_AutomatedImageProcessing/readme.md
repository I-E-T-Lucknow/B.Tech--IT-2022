
**Group No: 1**
Covid-19 AID for Detection of Corona virus from X-Ray Images using CNN
We presented CovidAID (Covid AI Detector), a Python3-based implementation, to identify
COVID-19 virus-infected persons from chest X-Ray images. The model takes as input a chest
X-Ray image and outputs the probability of being Covid-19 positive and normal.

**Dataset**
Covid-19 AID uses the Covid-19 chest X-ray dataset for COVID-19 X-Ray images.
Data Distribution
Type Normal Lung Opacity Covid-19
Train 3500 3500 3500
Validate 1000 1000 1000
Test 1000 1000 1000

**Results**
The X-ray is provided as the input to the model which after the pre-processing and frontal and
lateral classification is provided as input to the CNN model and gives the outcome as Covid-
19 infected or not with the probability of it.

**Visualizations**
To demonstrate the results qualitatively, we generate saliency maps for our model’s predictions
using RISE. The purpose of these visualizations was to have an additional check to rule out
model over-fitting as well as to validate whether the regions of attention correspond to the right
features from a radiologist’s perspective. Below are some of the saliency maps on COVID-19
positive X-rays.

**Contributions**
This work was collaboratively conducted by Ameya Srivastava, Ananya under the supervision
of Dr. Tulika Narang and Prof. Y N Singh.