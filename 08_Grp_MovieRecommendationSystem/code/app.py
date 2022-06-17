import streamlit as st
import pickle
import pandas as pd
def recommend(closematch):
     indexofmovie = movies[movies.title == closematch]['index'].values[0]
     similarity_score=list(enumerate(similarity[indexofmovie]))
     sotred_movies=sorted(similarity_score , key=lambda x:x[1], reverse=True)[1:20]
     recommend_movies= []
    # i = 1
     for i in sotred_movies:
         recommend_movies.append(movies.iloc[i[0]].title)
     return recommend_movies
     #    index = movie[0]
       #  title_from_index = movies[movies.index == index]['title'].values[0]
        # if (i < 20):
           #  print(i, ",", title_from_index)
            # i += 1



movie_dict=pickle.load(open('movies_dict.pkl','rb'))
movies=pd.DataFrame(movie_dict)
similarity=  pickle.load(open('similarity.pkl','rb'))

st.title('MRSFLEX')
selected_movie_name = st.selectbox(
    'How would you like to be contacted?',
    movies['title'].values)
if st.button('Recommend'):
   recommendation= recommend(selected_movie_name)
   for i in recommendation:
       st.write(i)
