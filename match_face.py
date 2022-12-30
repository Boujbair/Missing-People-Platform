from deepface import DeepFace

models = ["VGG-Face", "Facenet", "Facenet512", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib"]
model_name = "Facenet512"
metrics = ["cosine", "euclidean", "euclidean_l2"]
backends = ['opencv', 'ssd', 'dlib', 'mtcnn', 'retinaface']
img_1_path = "C:\\Users\\dell\\Desktop\\site_web_exam\\missing-people-finder-ai\\elon_musk_1.jpg"
img_2_path = "C:\\Users\\dell\\Desktop\\site_web_exam\\missing-people-finder-ai\\photok.jpg"

df = DeepFace.verify(img1_path = img_1_path, img2_path = img_2_path, model_name = model_name, distance_metric = metrics[2], detector_backend = backends[4])

# print(df)