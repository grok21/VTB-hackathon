from sys import argv
import os
import pickle
import pandas as pd
import random
trans = float(argv[1])
kmeans = pickle.load(open(os.path.abspath(os.curdir) + '/clustering_model.sav', 'rb'))
div = random.randint(1, 10)
pred = pd.DataFrame([trans], columns=['Transaction Amount'])
pred['1'] = 0
pred['2'] = 0
pred['3'] = 0
pred['4'] = 0
pred['5'] = 0
pred['6'] = 0
pred['7'] = 0
pred['8'] = 0
pred['9'] = 0
pred[str(div)] = 1
result = kmeans.predict(pred)
col = 'clust_' + str(result)
print(col)
#print('cluster_0')