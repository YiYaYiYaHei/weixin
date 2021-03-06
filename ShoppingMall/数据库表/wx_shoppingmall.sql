/*
Navicat MySQL Data Transfer

Source Server         : wx_ShoppingMall
Source Server Version : 80025
Source Host           : localhost:3306
Source Database       : wx_shoppingmall

Target Server Type    : MYSQL
Target Server Version : 80025
File Encoding         : 65001

Date: 2022-02-10 15:09:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for classification
-- ----------------------------
DROP TABLE IF EXISTS `classification`;
CREATE TABLE `classification` (
  `classificationId` int unsigned NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `classificationName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '大类名',
  PRIMARY KEY (`classificationId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of classification
-- ----------------------------
INSERT INTO `classification` VALUES ('1', '女装男装');
INSERT INTO `classification` VALUES ('2', '鞋类箱包');
INSERT INTO `classification` VALUES ('3', '母婴用品');
INSERT INTO `classification` VALUES ('4', '护肤彩妆');
INSERT INTO `classification` VALUES ('5', '汇吃美食');
INSERT INTO `classification` VALUES ('6', '珠宝配饰');
INSERT INTO `classification` VALUES ('7', '家装建材');
INSERT INTO `classification` VALUES ('8', '家居家纺');
INSERT INTO `classification` VALUES ('9', '百货市场');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `goodsDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品描述',
  `goodsPrice` decimal(10,2) unsigned DEFAULT NULL COMMENT '商品价格',
  `goodsOriginPrice` decimal(10,2) DEFAULT NULL COMMENT '商品原始价格',
  `goodsId` int unsigned NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `goodsImgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '商品照片',
  PRIMARY KEY (`goodsId`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('Orange Desire薄款短袖西装女2021夏季新款休闲职业西服外套上衣', '313.49', '469.00', '1', 'https://img.alicdn.com/imgextra/i1/28826658/O1CN01kVCP0k1z3PfobZNUY_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('【山夏Tee】TheNorthFace北面短袖T恤情侣款户外透气上新|7QRF', '268.00', '298.00', '2', 'https://img.alicdn.com/imgextra/i2/32440382/O1CN01xGEETN1Egzz1JRFQf_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('百洛安时尚套装套裙女夏季新款气质短袖上衣+百褶半身长裙两件套', '376.00', '568.00', '3', 'https://img.alicdn.com/imgextra/i4/44242389/O1CN017n9cVr1TWCsVHJwPk_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('HB HeartBeckon21夏奶黄小红花兔印花水彩短袖原创水墨圆领T恤', '296.00', '296.00', '4', 'https://img.alicdn.com/imgextra/i2/636240035/O1CN01HwsxFz1C84XgzkP4N_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('Orange Desire小西装外套女2021夏新款通勤套装薄款小个子空调衫', '351.49', '519.00', '5', 'https://img.alicdn.com/imgextra/i1/28826658/O1CN01M3yVbQ1z3PgSMJgck_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('ZHIZHI致知 槐序 亚麻西装外套女薄款2021新款短袖休闲气质小个子', '1138.50', '1150.00', '6', 'https://img.alicdn.com/imgextra/i4/131966193/O1CN01iY9A4D1vcRVbpRefn_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('2021春装欧美博主同款高品质外套上衣个性流行chic廓形酷酷西装女', '299.00', '399.00', '7', 'https://img.alicdn.com/imgextra/i3/107567291/O1CN0194GeNU23jKNv7516E_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('woppei  alexander W*两色粉蓝格纹图案高腰牛仔短裤拉丝边裤腿', '129.00', '129.00', '8', 'https://img.alicdn.com/imgextra/i2/369660120/O1CN01VcK7Bc1Cl0CneBqzn_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('王少女的店短袖西装外套2021年新春夏薄款设计感小众防晒休闲上衣', '179.00', '199.00', '9', 'https://img.alicdn.com/imgextra/i3/44294282/O1CN01SSNRHv1hVCd0VtdvA_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('王少女的店 短款小西装套装 黑色格子新款春夏秋薄外套西服短裙子', '110.00', '139.00', '10', 'https://img.alicdn.com/imgextra/i3/44294282/O1CN01zQ78uO1hVCchmMkJr_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('B.Duck小黄鸭x蛋黄哥联名西装套装2021年夏季新款宽松休闲满印潮', '151.00', '228.00', '11', 'https://img.alicdn.com/imgextra/i2/114481666/O1CN018X0HSu1OB4WnJxNEe_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('CU+CH夏季女休闲宽松西装领格纹中袖短款薄外套便服CB217075C', '245.00', '599.00', '12', 'https://img.alicdn.com/imgextra/i3/127847641/O1CN01bMVSgW26Jd1dyAftc_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('MAMOUR绿色网纱露肩抹胸珍珠链短款上衣女显瘦黑短裤2021夏季新款', '659.00', '659.00', '13', 'https://img.alicdn.com/imgextra/i2/132909245/O1CN0160mqvk2IAGJVrRig3_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('衬衣女新款2021年V领衬衫裙女宽松版型五分袖中长款洋气上衣女', '148.00', '338.00', '14', 'https://img.alicdn.com/imgextra/i4/128249812/O1CN010mcVOb2MLwnoiaPrZ_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('洛可可/ROCOCO2021夏新款甜美V领时髦碎花减龄显瘦全棉小衫上衣女', '149.00', '269.00', '15', 'https://img.alicdn.com/imgextra/i2/31237725/O1CN01eCORSo26w6IGNkorr_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('Rumia 官方授权 杨超越同款珍珠泡泡袖套装女夏短款上衣镂空短裙', '1480.00', '1480.00', '16', 'https://img.alicdn.com/imgextra/i2/114415712/O1CN015eougP1s490ClTCMO_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('ROCO黑色小西装外套女chic西服2021春秋高级设计感小众新款上衣', '268.00', '383.00', '17', 'https://img.alicdn.com/imgextra/i3/10348624/O1CN01CSuJJ42DZqM9iEND7_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('慕兔复古小西装外套女小个子春秋2021新款韩版宽松休闲西服上衣潮', '169.00', '218.00', '18', 'https://img.alicdn.com/imgextra/i3/56543102/O1CN01JTQv841YmlGbRiaP8_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('LIN CHAO ZHANG 网纱拼接减龄chun棉衬衫上衣+性感露肩连衣裙女', '599.00', '599.00', '19', 'https://img.alicdn.com/imgextra/i3/29249474/O1CN01Lcfme92Jr905TZEMr_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('甜甜的萱西装套装裙2021年新薄款夏女时尚设计感蓝色小个子两件套', '89.00', '99.00', '20', 'https://img.alicdn.com/imgextra/i3/115200067/O1CN014pTqEi1CMjDN3iAi4_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('王少女的店 短款小西装套装 黑色格子新款春夏秋薄外套西服短裙子', '110.00', '139.00', '21', 'https://img.alicdn.com/imgextra/i3/44294282/O1CN01zQ78uO1hVCchmMkJr_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('阿cir高级感米色小西装外套女薄款2021夏季新款百搭休闲西服上衣', '278.00', '518.00', '22', 'https://img.alicdn.com/imgextra/i4/125262563/O1CN015MIq1m1Untn8KTLDL_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('美式复古t恤夏季百搭宽松圆领休闲中长款显瘦下衣失踪短袖上衣女', '38.00', '39.00', '23', 'https://img.alicdn.com/imgextra/i3/54781025/O1CN01nn0CVp1JRUe7383fh_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('JHXC 高腰牛仔短裤女显瘦2021年夏季新款潮宽松韩版A字阔腿裤热裤', '109.00', '119.00', '24', 'https://img.alicdn.com/imgextra/i4/166530185/O1CN01WTikOa1DElwhgcM0o_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('Orange Desire休闲连衣裙法式温柔系显瘦收腰初恋裙v领裙子小个子', '275.49', '359.00', '25', 'https://img.alicdn.com/imgextra/i1/28826658/O1CN01QBcrF21z3Ph3WalsO_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('碎花雪纺衫女装设计感小众一字肩长袖衬衣夏季短款别致喇叭袖上衣', '32.98', '41.00', '26', 'https://img.alicdn.com/imgextra/i1/344710081/O1CN01CMSS6J1CT8lN7jmZt_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('无谓棉麻衬衫裙2021春夏新款女装灯笼袖宽松休闲气质亚麻连衣裙女', '188.00', '188.00', '27', 'https://img.alicdn.com/imgextra/i2/10588420/O1CN01eoiSnJ2C4PTpcyHYW_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('一三良品小个子 春季新品韩版休闲条纹西装外套女 复古西服上衣', '273.00', '273.00', '28', 'https://img.alicdn.com/imgextra/i3/12651855/O1CN01F7w4GI1PZdN9ixCvn_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('bf风纯色休闲小西装外套女韩版2021新款春季宽松长袖西服气质上衣', '25.98', '34.00', '29', 'https://img.alicdn.com/imgextra/i4/60141448/O1CN01hLny7o1MZEAnszMZd_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('2021春季新款休闲西装外套女韩版英伦风高级感设计感小众西服上衣', '429.00', '715.00', '30', 'https://img.alicdn.com/imgextra/i2/28529991/O1CN01JzX8Mx2NfvkhZSbwc_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('sx善喜玫红色中长款西装外套女上衣长袖通勤高雅显气质春季新款', '568.00', '588.00', '31', 'https://img.alicdn.com/imgextra/i4/45202905/O1CN01tqjUzs1XKXEav6lGb_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('西装外套女七分袖小西服kbne2021年春装新款韩版宽松长袖休闲上衣', '289.00', '329.00', '32', 'https://img.alicdn.com/imgextra/i4/114705906/O1CN01RpeHDw1tUzqkmmNFk_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('FERNWANG 西装外套春季新款 减龄炸街短款外套女', '89.00', '149.00', '33', 'https://img.alicdn.com/imgextra/i1/545910100/O1CN01PHHKGD1CbqGkwxzwm_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('播2021夏季新款仙女裙新疆棉气质立领收腰连衣裙女DDO2LD23449', '598.00', '998.00', '34', 'https://img.alicdn.com/imgextra/i1/22955057/O1CN01UW1s3B1nE9ZAwcZJO_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('阿cir高品质衬衫女新款2021夏装扎染设计感小众叠穿衬衣别致上衣', '238.00', '438.00', '35', 'https://img.alicdn.com/imgextra/i4/125262563/O1CN019KjkVY1UntmFk0aup_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('Orange Desire连衣裙2021夏季新款气质长裙可甜可盐裙子黑白显瘦', '189.99', '279.00', '36', 'https://img.alicdn.com/imgextra/i4/28826658/O1CN01PYjqsl1z3PgbciiLt_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('ZHIZHI致知 月临 西装裤子女春夏2021新款高腰显瘦气质锥腿裤环保', '522.50', '550.00', '37', 'https://img.alicdn.com/imgextra/i1/131966193/O1CN01dFRTOs1vcRUhF1YuR_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('白鹿语2021夏季新款优雅撞色拼接Polo裙甜美短袖宽松直筒连衣裙', '209.00', '209.00', '38', 'https://img.alicdn.com/imgextra/i2/313770147/O1CN01dBuuHf1CxMu95YVG7_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('ZHIZHI致知 天香引 碎花裙2021新款夏季气质法式连衣裙初恋泡泡袖', '881.10', '890.00', '39', 'https://img.alicdn.com/imgextra/i4/131966193/O1CN01QZjFFU1vcRVSJrQb5_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('ELAND衣恋2021春夏季新款V领显瘦荷叶边碎花连衣裙女EEOWB6305I', '299.00', '998.00', '40', 'https://img.alicdn.com/imgextra/i3/45444036/O1CN018s6qeE1fgXCclWGln_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('SPAO女士连衣裙2021新款春夏新款纯棉休闲纯色七分袖SPOWB24S39', '299.00', '299.00', '41', 'https://img.alicdn.com/imgextra/i1/78568318/O1CN014wAjVA2BJhA1J1j6q_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('牧衣游原创设计女装文艺T恤连衣裙【棉麻手绣吊染连衣裙】朝暮', '398.40', '498.40', '42', 'https://img.alicdn.com/imgextra/i1/15046440/O1CN01aFz8HS1xRZKtjtcCx_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('现货 2021春夏款 D家格纹伞状连衣裙 吊带修身腰带款A字裙格子裙', '268.00', '268.00', '43', 'https://img.alicdn.com/imgextra/i3/15333645/O1CN01WYlKUf1cnSLbZeynz_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('小个子中长款英伦风韩版西装春夏季新款宽松休闲西服外套上衣女士', '33.97', '33.98', '44', 'https://img.alicdn.com/imgextra/i1/130594012/O1CN01wlr9IR1fVXg7vXoch_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('T恤女中长款韩版宽松薄款长袖连帽防晒衫夏季设计感小众灰色上衣', '32.78', '40.00', '45', 'https://img.alicdn.com/imgextra/i3/344710081/O1CN01K0sQK11CT8krnHOBx_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('ba&sh巴安斯 2021夏季新款方领法式复古小蝴蝶连衣长裙女1E21BAYA', '2860.00', '2860.00', '46', 'https://img.alicdn.com/imgextra/i3/133413678/O1CN01kK3AR11d2ZPwhSBmd_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('SU复古灯芯绒黑色西装外套女韩版早春新款宽松百搭小个子休闲上衣', '158.00', '158.00', '47', 'https://img.alicdn.com/imgextra/i3/31476393/O1CN01hwJpEW1x62hiYSG2d_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('【买一送一】夏季新款法式气质清新蓝色气泡印花显瘦高腰连衣裙女', '139.00', '239.00', '48', 'https://img.alicdn.com/imgextra/i4/917280007/O1CN01Dwi7sX1BvFS30k8Yo_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('SLY 夏季新款复古纯色泡泡袖休闲衬衫中长款连衣裙030DAM33-3900', '629.00', '898.00', '49', 'https://img.alicdn.com/imgextra/i1/112791233/O1CN013IWKEc1Kyl2HI2QKK_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('LRUD西装外套女小个子2021春季新款韩版宽松气质上衣长袖小西服潮', '169.90', '188.70', '50', 'https://img.alicdn.com/imgextra/i3/101603216/O1CN0195518u1ZcyQseuC8m_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('ZHIZHI致知 天香引 碎花裙2021新款夏季气质法式连衣裙初恋泡泡袖', '881.10', '890.00', '51', 'https://img.alicdn.com/imgextra/i4/131966193/O1CN01QZjFFU1vcRVSJrQb5_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');
INSERT INTO `goods` VALUES ('白色炸街短款小西装外套女春季2021新款宽松港风气质时尚西服上衣', '48.98', '49.00', '52', 'https://img.alicdn.com/imgextra/i2/12679134/O1CN01LgfE662HLQK9QjlYA_!!0-saturn_solar.jpg_468x468q75.jpg_.webp');

-- ----------------------------
-- Table structure for shoppingcar
-- ----------------------------
DROP TABLE IF EXISTS `shoppingcar`;
CREATE TABLE `shoppingcar` (
  `uId` int NOT NULL COMMENT '用户id',
  `goodsId` int NOT NULL COMMENT '商品id',
  `carId` int unsigned NOT NULL AUTO_INCREMENT COMMENT '购物车货物id',
  `goodsNum` int NOT NULL COMMENT '商品数量',
  `goodsColor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品颜色',
  `goodsSize` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createTime` bigint NOT NULL COMMENT '创建时间戳',
  `updateTime` bigint NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`carId`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of shoppingcar
-- ----------------------------
INSERT INTO `shoppingcar` VALUES ('16', '1', '59', '1', '绿色', '160/84A/M', '1641440494355', '1641462660779');
INSERT INTO `shoppingcar` VALUES ('16', '1', '73', '3', '蓝色', '155/80A/S', '1641440906622', '1641545918969');
INSERT INTO `shoppingcar` VALUES ('16', '4', '80', '3', '绿色', '155/80A/S', '1641546851136', '1641546851136');
INSERT INTO `shoppingcar` VALUES ('16', '4', '81', '1', '蓝色', '160/84A/M', '1641546853451', '1641546853451');
INSERT INTO `shoppingcar` VALUES ('16', '4', '82', '1', '蓝色', '165/88A/L', '1641546855575', '1641546855575');
INSERT INTO `shoppingcar` VALUES ('16', '4', '83', '1', '绿色', '155/80A/S', '1641546859221', '1641546859221');
INSERT INTO `shoppingcar` VALUES ('16', '4', '84', '1', '绿色', '160/84A/M', '1641546861440', '1641546861440');
INSERT INTO `shoppingcar` VALUES ('16', '4', '85', '3', '绿色', '165/88A/L', '1641546863518', '1641546866492');
INSERT INTO `shoppingcar` VALUES ('16', '5', '86', '1', '绿色', '155/80A/S', '1641546884508', '1641546884508');
INSERT INTO `shoppingcar` VALUES ('16', '5', '88', '1', '蓝色', '165/88A/L', '1641546888353', '1641546888353');

-- ----------------------------
-- Table structure for subclassification
-- ----------------------------
DROP TABLE IF EXISTS `subclassification`;
CREATE TABLE `subclassification` (
  `subClassificationId` int unsigned NOT NULL AUTO_INCREMENT COMMENT '小类id',
  `classificationId` int NOT NULL COMMENT '大类id',
  `subClassificationName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '小类名称',
  `smallClassificationImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '小小类图片',
  `smallClassificationName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '小小类名称',
  PRIMARY KEY (`subClassificationId`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of subclassification
-- ----------------------------
INSERT INTO `subclassification` VALUES ('1', '1', '潮流女装', 'https://img.alicdn.com/bao/uploaded/i3/TB1XHGyKVXXXXaqXpXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg', '羽绒服');
INSERT INTO `subclassification` VALUES ('2', '1', '潮流女装', 'https://img.alicdn.com/bao/uploaded/i7/TB1P2qsKFXXXXc7XXXXYXGcGpXX_M2.SS2_180x180.jpg', '毛呢大衣');
INSERT INTO `subclassification` VALUES ('3', '1', '潮流女装', 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/604622217/O1CN01dUL6uP1SFQllMDHGm_!!604622217.jpg_180x180.jpg_.webp', '毛衣');
INSERT INTO `subclassification` VALUES ('4', '1', '潮流女装', 'https://img.alicdn.com/bao/uploaded/i4/74397681/TB29Y2PsFXXXXcFXXXXXXXXXXXX_!!74397681.jpg_180x180.jpg', '连衣裙');
INSERT INTO `subclassification` VALUES ('6', '1', '时尚男装', '	https://gw.alicdn.com/bao/uploaded/TB1iFCHKXXXXXXRaXXXSutbFXXX.jpg', '秋冬新品');
INSERT INTO `subclassification` VALUES ('7', '1', '衬衫/T恤', 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/142722258/O1CN01Rkt3WK1SYCwXX8GmR_!!142722258.jpg_180x180.jpg_.webp', '毛呢大衣');
INSERT INTO `subclassification` VALUES ('8', '1', '衬衫/T恤', 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i2/202686848/O1CN01trh2eZ20SQpZlNJ7D_!!202686848.jpg_180x180.jpg_.webp', '长袖T恤');
INSERT INTO `subclassification` VALUES ('9', '2', '女鞋', 'https://img.alicdn.com/bao/uploaded/i1/TB1VlAzKVXXXXbAXFXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg', '单鞋');
INSERT INTO `subclassification` VALUES ('10', '2', '女鞋', 'https://img.alicdn.com/bao/uploaded/i4/TB1GtitLXXXXXcYXpXXYXGcGpXX_M2.SS2_180x180.jpg', '帆布鞋');
INSERT INTO `subclassification` VALUES ('11', '2', '女鞋', 'https://img.alicdn.com/bao/uploaded/i3/TB1n0UAKVXXXXX9XpXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg', '高帮鞋');
INSERT INTO `subclassification` VALUES ('12', '2', '潮流女包', 'https://gw.alicdn.com/bao/uploaded/TB1zaLfLVXXXXcjXpXXSutbFXXX.jpg_240x240Q90.jpg_.webp', '斜挎包');
INSERT INTO `subclassification` VALUES ('13', '2', '潮流女包', 'https://img.alicdn.com/tps/i3/TB1R8dMHFXXXXamXXXXoxIg2pXX-220-310.png', '双肩包');
INSERT INTO `subclassification` VALUES ('14', '2', '旅行箱', 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/698598873/O1CN01dvieKc2FPsyf015ub_!!698598873.jpg_180x180.jpg_.webp', '拉杆箱');
INSERT INTO `subclassification` VALUES ('15', '2', '旅行箱', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/116506079/O1CN01ixqidO1umEN7cf35T_!!0-saturn_solar.jpg_180x180.jpg_.webp', '密码箱');
INSERT INTO `subclassification` VALUES ('16', '2', '旅行箱', 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/3906487461/O1CN01fqfg2I24zBZ8P1SMr_!!0-item_pic.jpg_180x180.jpg_.webp', '子母箱');
INSERT INTO `subclassification` VALUES ('17', '2', '旅行箱', 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/1782295836/O1CN010ELw4a1syw2B8lmHH_!!1782295836.jpg_180x180.jpg_.webp', '飞机箱');
INSERT INTO `subclassification` VALUES ('18', '3', '宝宝奶粉', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/33742485/O1CN01gKwHna1UEAqem9gnn_!!0-saturn_solar.jpg_180x180.jpg_.webp', '英国牛栏');
INSERT INTO `subclassification` VALUES ('19', '4', '美容护肤', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i4/2095455386/O1CN013O6BTf1peposbzrx0_!!0-item_pic.jpg_180x180.jpg_.webp', '卸妆');
INSERT INTO `subclassification` VALUES ('20', '4', '美容护肤', 'https://img.alicdn.com/imgextra/i1/15667065/O1CN01q0wY4C223ot5S3ZmG_!!0-saturn_solar.jpg_200x200.jpg', '面膜');
INSERT INTO `subclassification` VALUES ('21', '4', '美容护肤', 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2206686532409/O1CN01kQDTQU1TfMoV7iY10_!!2206686532409-0-picassoopen.jpg_180x180.jpg_.webp', '洁面');
INSERT INTO `subclassification` VALUES ('22', '4', '美容护肤', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i4/2497509022/O1CN01rieWrj2GW7ze8tvlQ_!!2497509022.jpg_180x180.jpg_.webp', '防晒');
INSERT INTO `subclassification` VALUES ('23', '5', '休闲零食', 'https://img.alicdn.com/bao/uploaded/TB13Kx5FVXXXXaoXVXXSutbFXXX.jpg_170x170.jpg', '牛肉干');
INSERT INTO `subclassification` VALUES ('24', '5', '休闲零食', 'https://img.alicdn.com/bao/uploaded/TB1Cjd4FVXXXXX1aXXXSutbFXXX.jpg_180x180.jpg', '坚果');
INSERT INTO `subclassification` VALUES ('25', '5', '生鲜果蔬', 'https://img.alicdn.com/imgextra/i4/923679694/TB2dgkNaXXXXXbbXXXXXXXXXXXX_!!923679694.jpg_180x180.jpg', '猕猴桃');
INSERT INTO `subclassification` VALUES ('26', '5', '生鲜果蔬', 'https://img.alicdn.com/imgextra/i3/923679694/TB2XPgMaXXXXXaCXpXXXXXXXXXX_!!923679694.jpg_180x180.jpg', '苹果');
INSERT INTO `subclassification` VALUES ('27', '5', '美酒佳酿', 'https://img.alicdn.com/bao/uploaded/TB1tIR5FVXXXXXFXFXXSutbFXXX.jpg_170x170.jpg', '红酒');
INSERT INTO `subclassification` VALUES ('28', '6', '时尚饰品', 'https://img.alicdn.com/imgextra/i1/125583986/O1CN016ZUQwz1fJdPNjow8E_!!0-saturn_solar.jpg_200x200.jpg', '项链');
INSERT INTO `subclassification` VALUES ('29', '6', '珠宝首饰', 'https://img.alicdn.com/imgextra/i1/18028608/O1CN016D923p2DSW1bvxdvu_!!0-saturn_solar.jpg_200x200.jpg', '翡翠');
INSERT INTO `subclassification` VALUES ('30', '6', '新娘配饰', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i4/132102582/O1CN01EiXsbm1UwbG42Zjfp_!!0-saturn_solar.jpg_180x180.jpg_.webp', '三件套');
INSERT INTO `subclassification` VALUES ('31', '7', '装修设计', 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2208492650142/O1CN01zJsEWa1Cv4v196I9n_!!2208492650142-0-picasso.jpg_180x180.jpg_.webp', '全案装修');
INSERT INTO `subclassification` VALUES ('32', '8', '卧室家具', 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/3164866122/O1CN01TxeDav1v5vP73jUTU_!!0-item_pic.jpg_180x180.jpg_.webp', '子母床');
INSERT INTO `subclassification` VALUES ('33', '8', '客厅家具', 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/2066012447/O1CN01guSwn01TwlmakEqHQ_!!0-item_pic.jpg_180x180.jpg_.webp', '沙发');
INSERT INTO `subclassification` VALUES ('34', '9', '居家日用', 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/3191674048/O1CN01HuRlik1fm1t3WJ8jf_!!3191674048-0-lubanu-s.jpg_180x180.jpg_.webp', '毛巾');
INSERT INTO `subclassification` VALUES ('35', '9', '应季百货', 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i4/1756960529/O1CN015Fetl01FmK5cTKhgg_!!1756960529.jpg_180x180.jpg_.webp', '防潮制品');
INSERT INTO `subclassification` VALUES ('36', '9', '应季百货', 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2429443091/O1CN011Yhih5tU7mY59Pq_!!2429443091.jpg_180x180.jpg_.webp', '晴雨伞');
INSERT INTO `subclassification` VALUES ('37', '9', '应季百货', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/106980377/O1CN01w7zbGD1Eei0E4vMJG_!!0-saturn_solar.jpg_180x180.jpg_.webp', '驱蚊液');
INSERT INTO `subclassification` VALUES ('38', '9', '个人清洁', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2206686532409/O1CN01ZTrAwI1TfMoJTr7Gx_!!2206686532409-0-picassoopen.jpg_180x180.jpg_.webp', '洗发护发');
INSERT INTO `subclassification` VALUES ('39', '1', '外套上衣', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/289910206/O1CN01Js7oyF1DOOGyj8jNR_!!0-item_pic.jpg_180x180.jpg_.webp', '风衣');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户token',
  `uId` int unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `sessionKey` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '微信小程序用户sessionKey',
  `openId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '微信小程序用户openId',
  `createdTime` bigint DEFAULT NULL COMMENT '创建时间',
  `loginTime` bigint DEFAULT NULL COMMENT '最后登录时间',
  `nickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户昵称',
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户性别',
  `avatarUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`uId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('h0g9qtqSgzrpF/r3QpDXVg8xxG5T7b8zLnvLVfG6jd4aSG03WBRTYyCaQ9Hsb1W6', '16', 'yggK9UWkvbD/UsZ+hwS1sg==', 'oz-FM46oLkyJ8H88Tf8EXtXowKy4', '1623396973755', '1644474004366', '微信用户', '未知', 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132');
