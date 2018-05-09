/*
Navicat MySQL Data Transfer

Source Server         : 1
Source Server Version : 50640
Source Host           : localhost:3306
Source Database       : note

Target Server Type    : MYSQL
Target Server Version : 50640
File Encoding         : 65001

Date: 2018-05-09 17:49:14
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
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8;

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
INSERT INTO `dir` VALUES ('108', '4', '无标题笔记', '0', '2018-05-09 15:50:50', '1', '0');
INSERT INTO `dir` VALUES ('109', '4', '未命名文件夹', '0', '2018-05-09 15:53:09', '0', '1');
INSERT INTO `dir` VALUES ('110', '4', '无标题笔记', '109', '2018-05-09 15:50:56', '1', '0');
INSERT INTO `dir` VALUES ('111', '4', '未命名文件夹', '0', '2018-05-09 15:53:12', '0', '1');
INSERT INTO `dir` VALUES ('112', '4', '未命名文件夹', '0', '2018-05-09 15:52:35', '0', '0');
INSERT INTO `dir` VALUES ('113', '4', '未命名文件夹', '0', '2018-05-09 15:53:00', '0', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('32', '4', '<p><img src=\"https://i.froala.com/download/800bf018a50955f3a27535c5df52176db60e020a.jpg?1525859004\" style=\"width: 300px;\" class=\"fr-fic fr-dib\"></p>', '无标题笔记', '108', '2018-05-09 17:43:43', '2018-05-09 17:43:43');
INSERT INTO `posts` VALUES ('33', '4', '', '无标题笔记', '110', '2018-05-09 15:50:56', '2018-05-09 15:50:56');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of share
-- ----------------------------
INSERT INTO `share` VALUES ('10', '4', '108', '', '7ec6c6fbde1f406986c6fbde1f806947');

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
