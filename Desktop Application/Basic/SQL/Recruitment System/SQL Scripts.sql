CREATE DATABASE Recruitment;
--Table JobSeeker ---------------------------------------------------------------------------------------
CREATE TABLE JobSeeker(
Fname VARCHAR(15),
Mname VARCHAR(15),
Lname VARCHAR(15),
Ssn INT NOT NULL PRIMARY KEY,
Gender CHAR,
AGE INT,
Military_Status VARCHAR(15),
Education VARCHAR(15),
Experience INT,
Adddress int)

-- 1) Signing up a new user (Job Seeker): Add new job seeker.
insert into JobSeeker values('Kareem','hasan','mohamed',542,'M',25,'Done','CS',3,12);
insert into JobSeeker values('ahmed','yousef','mohamed',156,'M',20,'Done','CS',2,5);
insert into JobSeeker values('ahmed','hessuien','mazen',123,'M',15,'Done','IT',5,10);
insert into JobSeeker values('yousef','essam','kareem',897,'M',15,'Done','IS',3,7);
insert into JobSeeker values('hazem','tareq','mohamed',515,'M',35,'Done','DS',4,3);
insert into JobSeeker values('nader','ahmed','ramadan',564,'M',24,'Done','AI',3,1);
insert into JobSeeker values('essam','walled','mohey',111,'M',22,'Done','CS',8,2);
insert into JobSeeker values('dina','ahmed','khaled',496,'F',21,'Done','IT',2,5);

-- 2) Update user details
update JobSeeker
set Fname='Jhon'
where Ssn=515;
select * from JobSeeker

-- 3) Showing a list of job seekers that satisfy certain criteria (e.g. industry, location, experience…)
-- 1]
select *
from JobSeeker
where JobSeeker.Education='CS';
-- 2]
select *
from JobSeeker
where JobSeeker.Adddress=1;
-- 3]
select *
from JobSeeker
where JobSeeker.Experience=3;

--******************************************************************************************************

-- Table Employer --------------------------------------------------------------------------------------
CREATE TABLE Employer(
Fname VARCHAR(15),
Mname VARCHAR(15),
Lname VARCHAR(15),
Ssn INT NOT NULL PRIMARY KEY,
Gender CHAR,
Salary INT,
Company_Id INT,
AGE INT,
Position VARCHAR(15),
Adddress int)

-- 2) Signing up a new user (Employer): Add new employer.
insert into Employer Values('Ahmed','mohamed','hasan',123,'M',1200,1,20,'HR',12);
insert into Employer Values('mohamed','yasser','hasan',456,'M',1566,1,25,'HR',3);
insert into Employer Values('mazen','kareem','yosef',213,'M',2500,3,28,'IT',10);
insert into Employer Values('mona','mohamed','eslam',494,'F',3000,4,22,'DEV',7);
insert into Employer Values('fares','ahmed','ahmed',159,'M',2500,2,25,'AD',5);
insert into Employer Values('abdelrhman','khaled','ahmed',157,'M',1200,1,29,'Full s',2);
insert into Employer Values('mohamed','khaled','yousef',255,'M',2500,2,30,'Manager',1);
insert into Employer Values('amir','mohamed','nader',128,'M',1600,4,19,'HR',7);

-- 2) Update user details
update Employer
set Fname='salma'
where Ssn=494;
select * from Employer
--**************************************************************************************************

-- Table Vacancy -----------------------------------------------------------------------------------
CREATE TABLE Vacancy(
Id INT NOT NULL PRIMARY KEY,
Salary INT,
Seniority_Level VARCHAR(15),
Industry VARCHAR(15),
Employment_Type VARCHAR(15),
LLocation VARCHAR(15),
Title VARCHAR(15),
Req_Experience_Id INT,
Company_Id INT)

ALTER TABLE Vacancy
ADD E_Id INT;

-- 1) Add a new vacancy:
insert into Vacancy Values(1,1000,'Senior','Technology','Full-Time','Giza','Senior AD',1,1);
insert into Vacancy Values(2,1400,'Junior','Hr','Full-Time','cairo','junior hr',2,2);
insert into Vacancy Values(3,2500,'Senior','Security','part-Time','Giza','seniro it',3,1);
insert into Vacancy Values(4,3000,'Mid-Junior','Database','remote','alex','database des',3,4);
insert into Vacancy Values(5,1500,'Mid-Senior','Home data','part-Time','cairo','mid hd',4,3);
insert into Vacancy Values(6,2560,'Junior','clouding','Full-Time','cairo','junior DB',2,2);
insert into Vacancy Values(7,3900,'Mid-Senior','mobile','Internship','mina','mid AD',3,1);
select * from Vacancy

update Vacancy set E_Id = 123 where Vacancy.Id = 1
update Vacancy set E_Id = 123 where Vacancy.Id = 2
update Vacancy set E_Id = 213 where Vacancy.Id = 7
update Vacancy set E_Id = 456 where Vacancy.Id = 3
update Vacancy set E_Id = 159 where Vacancy.Id = 5
update Vacancy set E_Id = 128 where Vacancy.Id = 4
update Vacancy set E_Id = 128 where Vacancy.Id = 6

-- 2) Update vacancy:
update Vacancy
set Title='Admin'
where Id=4;
select * from Vacancy
-- 3) Showing a list of vacancies that satisfy certain criteria (e.g. industry, location, required experience…)
-- 1]
select *
from Vacancy
where Vacancy.Industry='Security';
-- 2]
select *
from Vacancy
where Vacancy.LLocation='Cairo';
-- 3]
select *
from Vacancy
where Vacancy.Req_Experience_Id=1;

-- 4) Hide a vacancy (Employer)
Delete From Vacancy Where Vacancy.Title = 'database des';
select * from Vacancy
--**************************************************************************************************

-- Table Company -----------------------------------------------------------------------------------
CREATE TABLE Company(
Id INT NOT NULL PRIMARY KEY,
Nname VARCHAR(15),
Industry VARCHAR(15),
LLocation VARCHAR(15))
insert into Company Values(1,'Google','Programming','Selicon Valley');
insert into Company Values(2,'Microsoft','Windows','Cairo');
insert into Company Values(3,'Amazon','WebSerivces','New York');
insert into Company Values(4,'Apple','Mobile','China');
--**************************************************************************************************

-- Table Adddress ----------------------------------------------------------------------------------
CREATE TABLE Adddress(
Country VARCHAR(15) not null,
City VARCHAR(15) not null,
ZipCode INT not null,
Address_Id int not null primary key)
insert into Adddress Values('Egypt','Cairo',12518,12);
insert into Adddress Values('Egypt','Giza',12354,5);
insert into Adddress Values('Egypt','Alex',48995,1);
insert into Adddress Values('Egypt','Minofia',46513,3);
insert into Adddress Values('Egypt','Sina',12418,7);
insert into Adddress Values('Egypt','Embaba',18518,10);
insert into Adddress Values('Egypt','Aswan',12345,2);
--***************************************************************************************************

-- Table Required_Experience ------------------------------------------------------------------------
CREATE TABLE Required_Experience(
Id INT NOT NULL PRIMARY KEY,
Ex1 VARCHAR(15) ,
Ex2 VARCHAR(15) ,
Ex3 VARCHAR(15) ,
Ex4 VARCHAR(15) )
insert into Required_Experience values(1,'C++','java','sql','c#')
insert into Required_Experience values(2,'C#','php','math','network')
insert into Required_Experience values(3,'api','css','logic','php')
insert into Required_Experience values(4,'mysql','js','technical','stat')

--**************************************************************************************************

-- Table Applys_On ---------------------------------------------------------------------------------
CREATE TABLE Applys_On(
JS_Id INT,
V_Id INT,
Ddate VARCHAR(15),
PRIMARY KEY (JS_Id,V_Id));


-- 1) Apply and Save vacancy (Job Seeker)
insert into Applys_On Values(542,1,'12/5/2015')
insert into Applys_On values(156,5,'2/4/2020');
insert into Applys_On Values(123,5,'12/5/2015')
insert into Applys_On Values(515,1,'12/5/2015')
insert into Applys_On Values(496,1,'12/5/2015')
insert into Applys_On Values(111,6,'12/5/2015')
insert into Applys_On Values(897,5,'12/5/2015')
insert into Applys_On Values(111,2,'10/7/2015')
insert into Applys_On Values(897,3,'10/2/2019')
insert into Applys_On Values(111,4,'10/2/2019')
select * from Applys_On
--*******************************************************************************************************

-- Adding Foreign key for the tables --------------------------------------------------------------------

ALTER TABLE Employer ADD FOREIGN KEY (Company_Id) REFERENCES Company (Id);
ALTER TABLE JobSeeker ADD FOREIGN KEY (Adddress) REFERENCES Adddress (Address_Id);
ALTER TABLE Employer ADD FOREIGN KEY (Adddress) REFERENCES Adddress (Address_Id);
ALTER TABLE Vacancy ADD FOREIGN KEY (Req_Experience_Id) REFERENCES Required_Experience (Id);
ALTER TABLE Vacancy ADD FOREIGN KEY (Company_Id) REFERENCES Company (Id);
ALTER TABLE Vacancy ADD FOREIGN KEY (E_Id) REFERENCES Employer (Ssn);
alter table Applys_On ADD FOREIGN KEY(JS_Id) References JobSeeker(Ssn);
alter table Applys_On ADD FOREIGN KEY(V_Id) References Vacancy(Id);
--*********************************************************************************************************



-- Query No. (1) ------------------------------------------------------------------------------------
--What was the most interesting job “title” that had maximum number of applicants?

select top 1 Applys_On.V_Id,Count(*) as maxApplicants
from Applys_On
Group By Applys_On.V_Id 
order by maxApplicants desc;
-- Testing of the query:
select * from Db
select Vacancy.Title
from Db , Vacancy
where Db.V_Id=Vacancy.Id
--****************************************************************************************************


-- Query No. (2) -------------------------------------------------------------------------------------
-- What was the announced job “title” that hadn’t any applicants last month?
select Vacancy.Id from Vacancy
except(select DBTabl.V_Id from DBTabl)
-- this is the ids of the job title that hadn’t any applicants last month
--****************************************************************************************************


-- Query No. (3) -------------------------------------------------------------------------------------
-- Who was the employer with the maximum announcements last month?
select  Top 1 Vacancy.E_Id  ,count(*) as number
from Vacancy
Group by Vacancy.E_Id
order by number desc
--****************************************************************************************************


-- Query No. (4) -------------------------------------------------------------------------------------
-- Who were the employers didn’t announce any job last month?
select  Vacancy.E_Id  ,count(*) as number into Active_Employers
from Vacancy
Group by Vacancy.E_Id
order by number desc
-- Testing of the query:
select Employer.Ssn from Employer
except(select Active_Employers.E_Id from Active_Employers)
--****************************************************************************************************


-- Query No. (5) -------------------------------------------------------------------------------------
-- What were the available positions at each employer last month?
select Vacancy.Id from Vacancy
except(select DBTabl.V_Id from DBTabl)

-- Testing of the query:
select Vacancy.Title,Vacancy.E_Id from Vacancy
where Vacancy.Id Not in(select DBTabl.V_Id from DBTabl)
--******************************************************************************************


-- Query No. (6) ---------------------------------------------------------------------------
-- For each seeker, retrieve all his/her information and the number of jobs he applied for
select Applys_On.JS_Id,Count(*) as no_of_jobs_applied into DD
from Applys_On
Group By Applys_On.JS_Id
-- Testing of the query:
select *  from DD
select * 
from (JobSeeker full outer join DD on JobSeeker.Ssn=DD.JS_Id) 

--*******************************************************************************************


-- Queries to test SQL Statements
select * from JobSeeker;
select * from Employer;
select * from Company;
select * from Vacancy;
select * from Adddress;
select * from Required_Experience;
--*********************************
select * into DBTable
from JobSeeker
where JobSeeker.Gender = 'F';
--*********************************
select *
from DBTabl;
select *
from Applys_On
where Applys_On.V_Id=1;
select Vacancy.Title
from Vacancy,Applys_On;
--*********************************
select *
from JobSeeker,Applys_On
where JobSeeker.Ssn in  (select Applys_On.JS_Id from Applys_On)
--*********************************
select Applys_On.JS_Id,Count(*) as no_of_jobs_applied 
from Applys_On
Group By Applys_On.JS_Id