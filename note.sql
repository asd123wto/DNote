/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : note

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-13 02:12:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dir
-- ----------------------------
DROP TABLE IF EXISTS `dir`;
CREATE TABLE `dir` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `type` int(1) DEFAULT NULL COMMENT '0-dir   1-file',
  `is_delete` int(1) DEFAULT '0' COMMENT '0=false 1 true',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dir
-- ----------------------------
INSERT INTO `dir` VALUES ('77', '3', 'asd123123', '0', '2018-05-09 10:42:24', '0', '1');
INSERT INTO `dir` VALUES ('78', '3', 'Unnamed Directory', '77', '2018-05-08 18:28:21', '0', '0');
INSERT INTO `dir` VALUES ('79', '3', 'Unnamed Directory', '78', '2018-05-08 18:28:23', '0', '0');
INSERT INTO `dir` VALUES ('80', '3', 'Unnamed Directory', '78', '2018-05-08 18:28:25', '0', '0');
INSERT INTO `dir` VALUES ('81', '3', 'Unnamed Directory', '78', '2018-05-08 18:28:26', '0', '0');
INSERT INTO `dir` VALUES ('82', '3', 'Unnamed Directory1', '0', '2018-05-09 10:42:51', '0', '1');
INSERT INTO `dir` VALUES ('83', '3', 'Unnamed Directory', '0', '2018-05-08 18:30:30', '0', '0');
INSERT INTO `dir` VALUES ('84', '3', 'Unnamed Directory', '82', '2018-05-08 18:30:58', '0', '0');
INSERT INTO `dir` VALUES ('85', '3', 'Unnamed Directory', '84', '2018-05-08 18:30:59', '0', '0');
INSERT INTO `dir` VALUES ('86', '3', 'Unnamed Directory', '84', '2018-05-08 18:31:05', '0', '0');
INSERT INTO `dir` VALUES ('87', '3', 'Unnamed Directory', '84', '2018-05-08 18:31:06', '0', '0');
INSERT INTO `dir` VALUES ('88', '3', 'Unnamed Directory', '78', '2018-05-08 18:42:38', '0', '0');
INSERT INTO `dir` VALUES ('89', '3', 'Unnamed Directory', '78', '2018-05-08 18:43:33', '0', '0');
INSERT INTO `dir` VALUES ('90', '3', 'Unnamed Directory', '78', '2018-05-08 18:43:42', '0', '0');
INSERT INTO `dir` VALUES ('91', '3', 'Unnamed Directory', '82', '2018-05-08 18:44:32', '0', '0');
INSERT INTO `dir` VALUES ('92', '3', 'Unnamed Directory', '82', '2018-05-08 18:44:34', '0', '0');
INSERT INTO `dir` VALUES ('93', '3', 'Unnamed Directory', '82', '2018-05-08 18:44:41', '0', '0');
INSERT INTO `dir` VALUES ('94', '3', 'Unnamed Directory', '0', '2018-05-08 18:46:19', '0', '0');
INSERT INTO `dir` VALUES ('95', '3', 'Unnamed Directory', '0', '2018-05-08 18:46:26', '0', '0');
INSERT INTO `dir` VALUES ('96', '3', 'Unnamed Directory', '0', '2018-05-08 18:47:14', '0', '0');
INSERT INTO `dir` VALUES ('97', '3', 'Unnamed Directory', '0', '2018-05-08 18:47:19', '0', '0');
INSERT INTO `dir` VALUES ('98', '3', 'Unnamed Directory', '0', '2018-05-08 18:47:59', '0', '0');
INSERT INTO `dir` VALUES ('99', '3', 'Unnamed Directory', '77', '2018-05-08 18:48:01', '0', '0');
INSERT INTO `dir` VALUES ('100', '3', 'Unnamed Directory', '78', '2018-05-08 18:48:02', '0', '0');
INSERT INTO `dir` VALUES ('101', '3', 'Untitled Note', '79', '2018-05-08 18:51:25', '1', '0');
INSERT INTO `dir` VALUES ('102', '3', 'Untitled Note', '79', '2018-05-08 18:52:14', '1', '0');
INSERT INTO `dir` VALUES ('103', '3', '?', '77', '2018-05-08 18:53:05', '1', '0');
INSERT INTO `dir` VALUES ('104', '3', 'test', '0', '2018-05-09 10:12:06', '1', '0');
INSERT INTO `dir` VALUES ('105', '3', '未命名文件夹', '98', '2018-05-09 10:57:21', '0', '0');
INSERT INTO `dir` VALUES ('106', '3', '无标题笔记', '105', '2018-05-09 10:57:25', '1', '0');
INSERT INTO `dir` VALUES ('107', '3', '无标题笔记', '0', '2018-05-09 12:36:31', '1', '0');
INSERT INTO `dir` VALUES ('108', '4', 'DNote测试', '0', '2018-05-13 01:48:17', '1', '0');
INSERT INTO `dir` VALUES ('109', '4', '未命名文件夹', '0', '2018-05-09 15:53:09', '0', '1');
INSERT INTO `dir` VALUES ('110', '4', '无标题笔记', '109', '2018-05-09 15:50:56', '1', '0');
INSERT INTO `dir` VALUES ('111', '4', '未命名文件夹', '0', '2018-05-09 15:53:12', '0', '1');
INSERT INTO `dir` VALUES ('112', '4', '日记', '0', '2018-05-13 01:46:35', '0', '0');
INSERT INTO `dir` VALUES ('113', '4', '工作', '0', '2018-05-13 01:48:05', '0', '0');
INSERT INTO `dir` VALUES ('114', '4', '未命名文件夹', '0', '2018-05-09 23:17:13', '0', '1');
INSERT INTO `dir` VALUES ('115', '4', '2018.05.13', '112', '2018-05-13 01:47:00', '1', '0');
INSERT INTO `dir` VALUES ('116', '4', '2018.05.12', '112', '2018-05-13 01:47:13', '1', '0');
INSERT INTO `dir` VALUES ('117', '4', '微博发布 Q1 财报，月活跃用户突破 4 亿', '112', '2018-05-13 02:04:10', '1', '0');
INSERT INTO `dir` VALUES ('118', '4', '写给过去的自己', '113', '2018-05-13 01:48:00', '1', '0');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `content` longtext,
  `title` varchar(255) DEFAULT NULL,
  `dir` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `modify_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('32', '4', '<h2><mark class=\"marker-yellow\">DNote</mark>基于<mark class=\"marker-yellow\">Groovy</mark> + <mark class=\"marker-yellow\">Spring Boot</mark>技术。</h2><h3>前台使用纯<mark class=\"marker-yellow\">JQuery</mark>和<mark class=\"marker-yellow\">CKEditor</mark>组成。</h3><p>&nbsp;</p><p>这是一个简单的<mark class=\"marker-yellow\">云笔记</mark>项目，拥有简单的<mark class=\"marker-yellow\">Token控制</mark>（Redis实现）和笔记管理以及<mark class=\"marker-yellow\">分享</mark>功能。</p><p>同样也拥有<mark class=\"marker-yellow\">i18n国际化</mark>的功能。</p><p>&nbsp;</p>', 'DNote测试', '108', '2018-05-13 02:01:29', '2018-05-13 02:01:29');
INSERT INTO `posts` VALUES ('33', '4', '', '无标题笔记', '110', '2018-05-09 15:50:56', '2018-05-09 15:50:56');
INSERT INTO `posts` VALUES ('34', '4', '', '2018.05.13', '115', '2018-05-13 01:47:00', '2018-05-13 01:47:00');
INSERT INTO `posts` VALUES ('35', '4', '', '2018.05.12', '116', '2018-05-13 01:47:13', '2018-05-13 01:47:13');
INSERT INTO `posts` VALUES ('36', '4', '<p>​​微博的财报一直挺「好看」，因为总能看到这家公司又在赚钱。</p><p>5 月 9 日，微博发布 2018 年第一季度财报。财报显示，截至今年 3 月，微博月活跃用户数已增至 4.11 亿，成为全球第 7 家活跃用户规模突破 4 亿的社交产品。其中移动端用户比例达 93%，日活跃用户增至 1.84 亿。</p><figure class=\"image\"><img src=\"https://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/images_ifanr_cn/935b5378561702709b3c43a37ad93ba5.png\"></figure><p>再结合谢娜粉丝超 1 亿的新闻来看……竟然每 4 个微博用户就有一个是谢娜粉丝！（划掉）</p><figure class=\"image\"><img src=\"https://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/images_ifanr_cn/724e530032e58094ccab0b5fb194e66f.png\"></figure><p>营收数据方面，第一季度微博营收 22.13 亿元。其中，微博广告收入达 19.16 亿元，占比与去年差不多， 86.6% 左右。</p><p>尽管广告收入比例基本稳定，但广告收入却是一直在保持增长。原因除了大环境的变化，也有微博对于商业化的坦荡追求。</p><p>据艾瑞数据显示，中国及全球社交网络营销整体均呈现出快速增长的趋势，预计到 2019 年，中</p>', '微博发布 Q1 财报，月活跃用户突破 4 亿', '117', '2018-05-13 02:04:10', '2018-05-13 02:04:10');
INSERT INTO `posts` VALUES ('37', '4', '', '写给过去的自己', '118', '2018-05-13 01:48:00', '2018-05-13 01:48:00');

-- ----------------------------
-- Table structure for share
-- ----------------------------
DROP TABLE IF EXISTS `share`;
CREATE TABLE `share` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `post` int(11) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `share_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of share
-- ----------------------------
INSERT INTO `share` VALUES ('10', '4', '108', '', '7ec6c6fbde1f406986c6fbde1f806947');
INSERT INTO `share` VALUES ('11', '4', '117', '', '50fe065a49b74780be065a49b79780e7');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `vip` int(11) DEFAULT NULL COMMENT '0-false 1-true',
  `is_delete` int(1) DEFAULT '0' COMMENT '0=false 1 true',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('4', 'test123', 'CC03E747A6AFBBCBF8BE7668ACFEBEE5', 'test123', 'test123@qq.com', '0', '0');
