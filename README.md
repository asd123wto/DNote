# DNote
~~写给女朋友的~~练手，简单的基于html5开发的云笔记项目<br>
Simple HTML5-base note

<br>

[Online Demo(account: gittest, password: gittest)](http://note.rpsg.team)
![Image](https://raw.githubusercontent.com/dingjibang/DNote/master/readme/1.png)
![Image](https://raw.githubusercontent.com/dingjibang/DNote/master/readme/2.png)

<br>
这次项目主要后台是groovy + Spring Boot，数据库mysql。作为一个正经后端码农天天搞前端已经忘了后端怎么写了

至于前端，直接用的JQuery暴力写，并不想碰webpack npm之类的东西，因为搭建麻烦而且项目也没那么大<br>
初开始打算用Vue写，写了一会发现要造好多轮子，嫌麻烦就算了，本身也不太喜欢Vue（现实工作原因，产生心理阴影系列hh），就换回JQuery了<br>
React的话写起来更麻烦就更算了hhh，这里有以前写的一个[用来练手的React做的游戏道具编辑器](https://github.com/dingjibang/GDX-RPG/tree/master/extension/ItemEditor2)

#如何部署
	
1.Clone<br>
2.Create mysql DB named "note" then import from [note.sql](https://github.com/dingjibang/DNote/tree/master/note.sql)<br>
3.Using IDEA (or ?) import via gradle.<br>
4.Create redis server on localhost.<br>
5.RUN!

![Image](https://raw.githubusercontent.com/dingjibang/DNote/master/readme/3.jpg) 
