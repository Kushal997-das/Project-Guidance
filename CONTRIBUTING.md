# Contributing Guidelines  

This documentation contains a set of guidelines to help you during the contribution processes.   
We are happy to welcome all the contributions from anyone willing to improve/add new projects (doesn't matter which language) to this Repository.

Code of Conduct
---------------

Please read and follow our [Code of Conduct.](https://github.com/Kushal997-das/Project-Guidance/blob/main/CODE_OF_CONDUCT.md)

### Before contributing please ensure your **pull request** adheres to the following guidelines:


## STEP-0 : Key Points to remember :
  - Look at the previous projects and get some ideas from them [Previous](https://github.com/Kushal997-das/Project-Guidance)
  - Suppose you want to contribute one project to one particular domain, then first check is there any [Project/s](https://github.com/Kushal997-das/Project-Guidance) that exist with the same language or not.
  - If Yes that your project is already existing with the same programming language, then you can't add your project to this repo. 
  - If there is no such project then make sure you enter your particular domain and create one folder and folder name should be **your project name** .
  - Please don't add any License under your project. This repo is already under MIT License.
  
  
    ## **Flow** :
      - Project-Guidance --> Choose your domain --> Choose your project level (basic,Intermediate,Advance) --> Create a folder with your project name --> Send a pull request.
  <img align="center" alt="png" height='450px' width="950px" src="https://github.com/Kushal997-das/Project-Guidance/blob/main/Documents/official%20sructure%20tree.png" />   
       
 
## STEP-1 : Find an issue
  - Take a look at the Existing [Issues](https://github.com/Kushal997-das/Project-Guidance/issues) and [Pull Requests](https://github.com/Kushal997-das/Project-Guidance/pulls) as yours may be a duplicate  or create your own [Issues!](https://github.com/Kushal997-das/Project-Guidance/issues) 
  
  - Wait for the Issue to be assigned to you after which you can start working on it.
  
  
> See the following image:
 
 > Fork the repository by clicking on `Fork` button:
 
 ![Fork-Image](https://github.com/TawfikYasser/Project-Guidance/blob/main/Documents/Fork-Image.png)
  
 > Clone the repository by clicking on `Code` button:
 
 ![Clone-Image](https://github.com/TawfikYasser/Project-Guidance/blob/main/Documents/Clone-Image.png)
 
 > Then click on the `clipboard` icon and follow the below commands: 
 
 ![Clone-Image-2](https://github.com/TawfikYasser/Project-Guidance/blob/main/Documents/Clone-Link-Image.png)
 
  
## Step 2 : Fork the Project  
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
 
 ## Step 3 : Choose your domain.
- Create a branch  :
 ``` 
 $ git branch <branch-name>
 $ git checkout <branch-name>

  ```
 
- Add your projects to a folder and the folder name should be your project .   
- Add all the files/folders needed.  
- After you've made changes or made your own contributions to the project, add changes to the branch you've just created by:
 ```
 # To add only a few files to Branch_Name
 $ git add <some files>
 # To add only a few files to Branch_Name
 $ git add <some files>
  ```
  
 
## Step 4 : Commit  
- To commit give a descriptive message for the convenience of reviewer by:  
- Please make an individual commit for each suggestion in a separate pull request.
- Check your spelling and grammars.
- Remove any trailing whitespaces.
```
# This message get associated with all the files you have changed  
$ git commit -m "message"  
```  

## Step 5 : Work Remotely  
- Now you are ready to work on the remote repository.  
- When your work is ready and complies with the project conventions, upload your changes to your fork:  
  
 ```  
 # To push your work to your remote repository  
 $ git push -u origin Branch_Name  
 ```
 
 ## Step 6 : Pull Request  
- Go to your repository in your browser and click on compare and pull requests. Then add a title and description to your pull request that explains your contribution.  
- Make sure your PR is easy to review. That means having a clear description and only touching code that is necessary for your change.
- Check your spelling and grammars.
- Remove any trailing whitespaces.

**Note** :
  - New categories, or improvements to the existing categorisations are always welcome.
  - Being an open source contributor doesn't just mean writing code, You can either help out by writing documentations, tests, or even giving suggestions. 🏆
  
## Need more help?🤔  
You can refer to the following articles on basics of Git and Github and also contact the Project [Mentor](https://github.com/Kushal997-das/), in case you are stuck:  
- [Forking a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)  
- [Cloning a Repo](https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request)  
- [How to create a Pull Request](https://opensource.com/article/19/7/create-pull-request-github)  
- [Getting started with Git and GitHub](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6)  
- [Learn GitHub from Scratch](https://www.youtube.com/watch?v=BCQHnlnPusY&list=PLozRqGzj97d02YjR5JVqDwN2K0cAiT7VK)  
  
Tips from us😇
-------------
It always takes time to understand and learn. So, do not worry at all. We know you have got this!💪
