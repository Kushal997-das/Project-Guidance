# Contributing Guidelines  

This documentation contains a set of guidelines to help you during the contribution process.   
We are happy to welcome all the contributions from anyone willing to improve/add new projects (doesn't matter which language) to this Repository.

### Before contributing please ensure your **pull request** adheres to the following guidelines:


 ## STEP-0 : Key Points to remember :
  - Look at the previous projects and get some idea from them [Previous](https://github.com/Kushal997-das/Project-Guidance)
  - Suppose you want to contribute one javascript projet then first check is there any [javascript folder](https://github.com/Kushal997-das/Project-Guidance) is existing or not.
  - If Yes then you can contribute there but make sure under that folder you have to create another folder with your project name . 
  - If there is no such folder then make sure you create one folder and folder name should be **Javascript**  (In this case)  and add your project.
  
    -  **NOTE** If you think the project which you want to contribute is beginner level then the flow should be like this :-
        - **Javascript --> Basic --> Projects_name(folder) --> project_file** (In case of Basic Project)
        - **Javascript --> Intermediate --> Projects_name(folder) --> project_file** (in case of intermediate)
        - **Javascript --> Advance --> Projects_name(folder) --> project_file** (In case of Advance Project)
 
## STEP-1 : Find an issue
  - Take a look at the Existing [Issues](https://github.com/Kushal997-das/Project-Guidance/issues) and [Pull Requests](https://github.com/Kushal997-das/Project-Guidance/pulls) as yours may be a duplicate  or create your own [Issues!](https://github.com/Kushal997-das/Project-Guidance/issues) 
  
  - Wait for the Issue to be assigned to you after which you can start working on it.
  
  
## Step 1 : Fork the Project  
- Fork this Repository. This will create a Local Copy of this Repository on your Github Profile. Keep a reference to the original project in `upstream` remote.  
 ```  
 $ git clone https://github.com/<your-username>/<repo-name>  
 $ cd <repo-name>  
 $ git remote add upstream https://github.com/<upstream-owner>/<repo-name>  
 ```  
 
 - If you have already forked the project, update your copy before working.  
 ```  
 $ git remote update  
 $ git checkout <branch-name>  
 $ git rebase upstream/<branch-name>  
 ```  
 
 ## Step 3 : Work on the issue assigned  
- Work on the issue(s) assigned to you.   
- Add all the files/folders needed.  
- After you've made changes or made your contribution to the project add changes to the branch you've just created by:  
 ```  
 # To add all new files to branch Branch_Name  
 $ git add .  

 # To add only a few files to Branch_Name
 $ git add <some files>
 ```
## Step 4 : Commit  
- To commit give a descriptive message for the convenience of reviewer by:  
- Please make an individual commit for each suggestion in a separate pull request.
- Check your spelling and grammar.
- Remove any trailing whitespace.
```
# This message get associated with all files you have changed  
$ git commit -m "message"  
```  

## Step 5 : Work Remotely  
- Now you are ready to your work to the remote repository.  
- When your work is ready and complies with the project conventions, upload your changes to your fork:  
  
 ```  
 # To push your work to your remote repository  
 $ git push -u origin Branch_Name  
 ```
 
 ## Step 6 : Pull Request  
- Go to your repository in browser and click on compare and pull requests. Then add a title and description to your pull request that explains your contribution.  
- Make sure your PR easy to review. That means having a clear description and only touching code that's necessary for your change.
- Check your spelling and grammar.
- Remove any trailing whitespace.

**Note**
  - New categories, or improvements to the existing categorisation, are always welcome.
  - Being an open source contributor doesn't just mean writing code, either. You can help out by writing documentation, tests, or even giving suggestions.
  
