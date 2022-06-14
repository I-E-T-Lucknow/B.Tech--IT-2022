IMPORT cv2
iIMPORT keras
from keras.models import model_from_json
IMPORT numpy as np

#from scipy.misc import imresize
def signet_classifier(input1, input2):
    """
    input1 : image from form
    input2 : image from server
#




    img2 = cv2.imread(input2,0)
    _, img2 = cv2.threshold(img2,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    img2 = cv2.bitwise_not(img2)
    img2 = ndimage.gaussian_filter(img2, 1)
    mean, std = cv2.meanStdDev(img2)
    if std < 0.001:
        img2 = (img2-mean)(0.001)
    else:
        img2 = (img2-mean)/std
    #img2 = cv2.bitwise_not(img2)
    img2 = cv2.resize(img2, (224, 224))
    img2 = img2.reshape((224, 224, 1))
    img2 = img2.astype(np.float32)

    image = np.concatenate([img1, img2] , axis=2)
    image = image.reshape((1, 224, 224, 2))


    json_file = open('SIGNET_Weights/model_n.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)

    # load weights into new model
    loaded_model.load_weights("SIGNET_Weights/model_n.h5")
    loaded_model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    pred = loaded_model.predict(image)

    return str(pred[0][0])
