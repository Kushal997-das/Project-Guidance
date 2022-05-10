import streamlit as st
import preprocessor
import helper
import matplotlib.pyplot as plt
import seaborn as sns

st.sidebar.title('WhatsApp Chat Analyzer📊')
uploaded_file= st.sidebar.file_uploader('Choose a file')
if uploaded_file is not None:
    bytes_data=uploaded_file.getvalue()
    data=bytes_data.decode('utf-8')
    #st.text(data)
    df=preprocessor.process(data)
    #st.dataframe(df)
    user_list=df['user'].unique().tolist()
    user_list.remove('group_notification')
    user_list.insert(0,'Overall')
    selected_user=st.sidebar.selectbox('Show analysis wrt',user_list)
    if st.sidebar.button("Show Analysis"):
        num_messages,words, num_media_messages,num_links=helper.fetch_stats(selected_user,df)
        st.title("Top statistics")
        col1,col2,col3,col4=st.columns(4)
        with col1:
            st.header("Total messages...")
            st.title(num_messages)
        with col2:
            st.header("Total Words...")
            st.title(words)
        with col3:
            st.header("media shared..")
            st.title(num_media_messages)
        with col4:
            st.header("Links shared..")
            st.title(num_links)
        if selected_user=='Overall':
            st.title('Most Busy Users')
            x,new_df=helper.most_busy_users(df)
            fig,ax=plt.subplots()
            col1,col2=st.columns(2)
            with col1:
                ax.bar(x.index,x.values,color='grey')
                plt.xticks(rotation='vertical')
                st.pyplot(fig)
            with col2:
                st.dataframe(new_df)

        #wordcloud
        st.title('WordCloud')
        df_wc=helper.create_wordcloud(selected_user,df)
        fig,ax=plt.subplots()
        ax.imshow(df_wc)
        st.pyplot(fig)

        #Monthly- Timeline
        st.title("Monthly timeline")
        timeline=helper.monthly_timeline(selected_user,df)
        fig,ax=plt.subplots()
        ax.plot(timeline['time'],timeline['message'],color='green')
        plt.xticks(rotation='vertical')
        st.pyplot(fig)

        #daily_timeline
        st.title("Daily timeline ")
        daily_timeline=helper.daily_timeline(selected_user,df)
        fig, ax = plt.subplots()
        ax.plot(daily_timeline['only_date'], daily_timeline['message'], color='purple')
        plt.xticks(rotation='vertical')
        st.pyplot(fig)

        #Activity-map
        st.title("Activity-Map")
        col1,col2=st.columns(2)
        with col1:
            st.header("Most busy day")
            busy_day=helper.week_activity_map(selected_user,df)
            fig, ax = plt.subplots()
            ax.bar(busy_day.index,busy_day.values)
            plt.xticks(rotation='vertical')
            st.pyplot(fig)

        with col2:
            st.header("Most busy Month")
            busy_month = helper.month_activity_map(selected_user, df)
            fig, ax = plt.subplots()
            ax.bar(busy_month.index, busy_month.values, color='pink')
            plt.xticks(rotation='vertical')
            st.pyplot(fig)


#Code by Ayush Jain

        #most common words using in chat(Top 25)
        st.title("Most-Common-words")
        most_common_df=helper.most_common_words(selected_user,df)
        fig,ax=plt.subplots()
        ax.barh(most_common_df[0], most_common_df[1])
        plt.xticks(rotation='vertical')
        st.pyplot(fig)
        st.dataframe(most_common_df)

        #emoji Analysis
        st.title("Emoji-trend")
        emoji_df=helper.emoji_analy(selected_user,df)
        col1,col2=st.columns(2)
        with col1:

            st.dataframe(emoji_df)
        with col2:
            fig,ax=plt.subplots()
            ax.pie(emoji_df[1].head(10),labels=emoji_df[0].head(10),autopct="0.2f")
            st.pyplot(fig)

        #Heat-Map
        st.title("Weekly-heatmap")
        user_heatmap=helper.activity_heatmap(selected_user,df)
        fig, ax = plt.subplots()
        ax=sns.heatmap(user_heatmap)
        st.pyplot(fig)
        














