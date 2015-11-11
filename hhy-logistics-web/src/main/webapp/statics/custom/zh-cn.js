﻿var CULTUREINFO = "zh-HK";
var LANG = {
    'ValidateMobile_Error': '手机号码格式错误',
    'ValidateEmail_Error': '电子邮件格式错误',
    'ValidateTextLength_Error': '文本长度应小于{0}个字符',
    'ValidateIsNumber_Error': '请输入数字',
    'Valid_UserCode': '请输入用户名',
    'Valid_UserCode_Range':'用户账号长度必须为{0}到{1}个数字或英文字符',
    'Valid_UserCode_Exists': '该用户名已经存在，请重新输入',
    'Valid_Mobilephone_Exists': '此号码已注册',
    'Valid_UserPwd': '请输入密码',
    'Valid_UserPwd_MinLength': '密码的最小长度是{0}个字符',
    'Valid_UserPwd_Input': '请输入确认密码',
    'Valid_UserPwd_Checked': '两次密码输入不一致',
    'Valid_Tel_Range': '手机号码长度应为{0}到{1}位',
    'Valid_Tel_MaxLength': '手机号码长度应为{0}',
    'Valid_Tel_Format': '手机号码错误',
    'Valid_Email': '请输入电子邮件',
    'Valid_Digits': '请输入数字',
    'Valid_Number': '必须输入合法的数字',
    'Valid_Range': '请输入{0}到{1}的值',
    'Valid_Mobilephone': '请输入手机号码',
    'Operate_Sel_Messgae': '请选择一条记录',
    'Success_Save': '保存成功',
    'Success_Update': '修改成功',
    'Success_Submit': '提交成功',
    'AjaxSubmit_DataException': '数据处理异常',
    'AjaxSubmit_RequireException': '请求异常',
    'AjaxSubmit_LockError': '请勿重复操作',
    'AjaxSubmit_LockLoading': '正在加载数据',
    'FormSubmit_LoadDataFailed': '数据加载失败',
    'OrderContract_Loading': '等待服务端计算价格......',
    'Order_InsureNotice': '尊敬的客户，您的订单尚未购买保险，为保障您的权益，\n\r我们将免费为您提供每单最高赔偿额不超过人民币2000元\n\r的财产保险，如果我们提供的保险无法满足您的需求，\n\r请点击“取消”重新购买保险。',
    'Order_ActWeight': '实际重量',
    'Order_NumGraterThan0': '请输入大于0的数字',
    'Order_ActVolume': '实际体积',
    'Order_PriceError': '价格错误:',
    'Order_SelfLineOrderError': '供应商不能对自己的干线进行下单操作',
    'Order_PickUpError': '请重新选择发货方式',
    'Order_DeliveryError': '请重新选择收货方式',
    'Order_TotalWeight': '总重量',
    'Order_TotalVolume': '总体积',
    'Order_ShipperName_Null': '请输入发货人姓名',
    'Order_ShipperAreaId_Null': '请选择发货人所在区域',
    'Order_ShipperTownId_Null': '请选择发货人所在镇',
    'Order_ShipperAddress_Null': '请输入发货人详细地址',
    'Order_ShipperContacts_Null': '请输入发货人的联系人姓名',
    'Order_ConsigneeName_Null': '请输入收货人姓名',
    'Order_ConsigneeAreaId_Null': '请选择收货人所在区域',
    'Order_ConsigneeAddress_Null': '请输入收货人详细地址',
    'Order_ConsigneeContacts_Null': '请输入收货人的联系人姓名',
    'Order_ConsigneeTownId_Null': '请选择收货人所在镇',
    'Order_PickUpOn_Null': '请输入提货日期',
    'Order_PickUpProvider_Null': '请选择上门取货服务提供商',
    'Order_PickUpPoint_Null': '请选择提货时间范围',
    'Order_ShipperBrancheNo_Null': '请选择发货网点',
    'Order_PayAgentAmount': '代付费用',
    'Order_AgentReceiveAmount': '代收货款',
    'Order_DeliveryOn_Null': '请输入送货日期',
    'Order_DeliverProvider_Null': '请选择送货到门服务提供商',
    'Order_DeliveryPoint_Null': '请选择送货时间范围',
    'Order_ConsigneeBrancheNo_Null': '请选择提货网点',
    'Order_TotalCost': '投保金额',
    'Order_InsureFavoree_Null': '保险受益人不能为空',
    'Order_DestPayFreight': '到付费用',
    'Order_GetInfoException': '获取信息异常',
    'DeliveryOrder_DeliveryDate_Error': '超过16点无法继续下今日订单，请选择隔日订单。',
    'DeliveryOrder_AddRecount_Confirm': '订单提交时间超过14点,将另外收取50%的加急费,请确认！',
    'DeliveryOrder_Submit_Confirm': '1.运东西当日完成14:00点前下达的订单，14:00以后订单次日完成。\n\r2.客户要求当日完成14:00后下达的订单为加急订单，加急订单加收50%的加急费。\n\r3.偏远区域、特殊区域运输，或有装卸搬运要求等加收费用面议。\n\r4.司机免费等候1小时，超过1小时每单加收50元，\n\r5.如果超过2小时以上司机离开，客户需要支付运费50%做补偿。',
    'DeliveryOrder_OverCarrigeWeight_Error': '重量超过回程车载重量',
    'DeliveryOrder_OverCarrigeVolume_Error': '体积超过回程车载体积',
    'DeliveryOrder_DeliveryDate_Null': '请选择配送日期',
    'DeliveryOrder_DeliveryPoint_Error': '配送时间格式错误，请重新填写！使用24小时制，格式形如8:00',
    'DeliveryOrder_DeliveryPointOver_Error': '配送结束时间不能早于开始时间，请重新填写！',
    'Order_InsureDesc': '投保说明',
    'Order_City_Null': '请选择市',
    'Order_Chose': '选择',
    'Order_Shipper': '发货人',
    'Order_Consignee': '收货人',
    'Order_Tele': '电话',
    'Order_GetTownInfo_Error': '获取镇信息异常',
    'Order_OfficeNotProvide': '你选择的区域该供应商不提供',
    'Order_EmbgoCargo_Error': '您提交的货物中检测到含有禁运货物',
    'Order_CantSubmit': '不能提交',
    'Order_Cargo_Null': '货物信息不能为空',
    'ValidNumric_CantNull': '不能为空',
    'ValidNumric_MustNum': '必须为数字',
    'ValidNumric_CantLarger': '不能大于',
    'ValidNumric_CantLess': '不能小于',
    'Order_PriceCalc_Exception': '费用计算异常',
    'Order_TotalCostOver_Error': '线上最高只能保50W,大于50W的请联系客服',
    'Order_DeliveryNotProvide': '该服务商不支持该区域的送货到门',
    'Order_PickUpNotProvide': '该服务商不支持该区域的上门取货',
    'Order_CarCount': '的发车数量',
    'Order_ShouldLargerThan0': '应大于0',
    'Order_Accept_Error': '订单号{OrderNo}未预付运费，暂不能受理为正式订单',
    'Order_Order': '订单',
    'Order_NoNeedPickUp_Error': '没有选择上门提货服务,无需调度',
    'Order_PicUpDispatch_Null': '请先填写提货调度',
    'Order_InWarehouse_Error': '货物未到达，不能货物入库',
    'Order_NoNeedDelivery_Error': '没有选择送货上门服务,无需调度',
    'Order_DeliveryDispatch_Null': '请先填写送货调度',
    'Order_NotArrived_Error': '货物未送达至用户，不能签收',
    'Order_NeedStatus': '要在',
    'Order_CanChangeToStatus': '下时才能',
    'Order_ChooseBranch_Title': '选择网点',
    'Order_OrderSign_Title':'签收',
    'Order_OpenDiffInfo_Title':'运费差价',
    'Order_OrderTrace_Title':'订单跟踪',
    'Order_OrderNo':'订单号',
    'Order_DeliveryOrderTrace_Title':'城配订单跟踪',
    'Order_ShowConsigneer_Shipper':'委托人信息',
    'Order_ShowConsigneer_Forward':'物流商信息',
    'Order_GetOrderFiles_Title':'订单附件管理',
    'Order_ChangeTransportline_Title':'干线改派',
    'Order_CheckedBill_Title':'费用确认',
    'Order_SubmitCharge_Title':'提交费用',
    'Order_SubmitCharge_RepeatError':'费用已经提交，且经用户确认，不能继续提交费用',
    'Order_OrderIs':'订单号为',
    'Order_PrePay_RepeatError':'已经预付，无需重复预付！',
    'Order_PrePay_DraftError':'是草稿状态，无法预付！',
    'Order_Pay_RefusedError':'订单已被拒绝，不能支付！',
    'Order_Pay_DraftError':'处于草稿状态，不能支付！',
    'Order_Pay_StatusError':'不是待付款状态，不能支付！',
    'Order_Dele_Req':'要在【草稿】状态下才能删除',
    'Order_Withdraw_Req':'要在【预约】或【待受理】（未付款）状态下才能撤回',
    'Order_PickUpDispatch_Req':'要在【已受理】状态下才能进行提货调度操作',
    'Order_InWarehouse_Req':'要在【已受理】或【提货中】状态才能修改为【货物入库】状态',
    'Order_OrderSign_Req':'要在【已到达】或【送货中】状态才能修改为【已签收】状态',
    'Order_InTransit_Req':'要在【货物入库】状态才能修改为【运输中】状态',
    'Order_Arrived_Req':'要在【已发货】状态才能修改为【已到达】状态',
    'Order_DeliveryDispatch_Req':'要在【已到达】状态才能进行送货调度操作',
    'Order_NoChargeDiff_Error':'无费用差异,无需确认',
    'Order_RefuseCharge_Req':'要在【待确认费用】状态才能修改为【已拒绝费用】状态',
    'Order_OrderStatusIs':'订单状态为',
    'Order_CantCancel':'不能做取消订单操作',
    'Register_Mobile_Notice':'请输入真实的手机号码',
    'Register_VerifyCodeSended':'验证码已发送',
    'Register_RegetVerifyCodeSecond':'秒后重新获取验证码',
    'Register_GetVerifyCode':'获取验证码',
    'Register_VerifyCodeChanged':'号码已变更，请重新验证',
    'Register_VerifyCode_Error':'请输入正确的验证码',
    'Register_UlinkServiceTerms':'请阅读Ulink服务条款',
    'Register_Email_Repeat':'电子邮件已被注册',
    'Register_Mobile_Repeat':'手机号码已被注册',
    'Line_PleaseChose': '请选择',
    'Line_New_Title':'新增干线信息',
    'Line_Edit_Title':'修改干线信息',
    'Line_Record_Null':'请选择一条记录',
    'Line_Delete_Confirm': '确定删除数据？',
    'Line_Disabled_Confirm': '确定禁用干线？',
    'Line_CarrigeCantStore': '回程直送不能收藏',
    'Line_SelfLineCantStore': '供应商不能收藏自己的干线',
    'Line_StoreSuccess': '干线收藏成功，可到我的收藏中查看',
    'UC_ApplyBankMemberNum_Confirm': '确定要申请运东西资金监管账号？',
    'UC_ApplyBankMemberNum_Exception': '对不起,申请异常.异常原因:',
    'UC_Apply_Type_Null': '请提供申请类型',
    'UC_Apply_Confirm': '确认要申请开通该功能?',
    'UC_Apply_Success': '您的申请已经提交，请等候认证',
    'LAYLOADING': '等待中',
    'Origin': '始发地',
    'Destination': '目的地',
    'ValidateAddress_Error': '不存在该地区',
    'APPDialog_Title': 'APP下载',
    'APPDialog_Colse': '关闭',
    'APPDialog_QRCodeDowLoad': '二维码下载',
    'APPDialog_CodeScan': '请使用手机二维码扫描器扫描该图形即可下载',
    'APPDialog_LocalDownLoad': '下载到本地',
    'APPDialog_LocalComputerDownLoad': '点击下载到本地电脑',
    'APPDialog_GetLinkMessage': '短信获取下载链接',
    'APPDialog_Mobilephone_Null': '输入手机号码',
    'APPDialog_SMSLink': '发送短信至手机获取下载链接',
    'APPDialog_VerifyCode': '验证码',
    'WebOrderTrace_OrderNo_Null': '请输入要查询的订单号',
    'WebOrderTrace_Title': '运单跟踪',
    'WebOrderTrace_WayBillNo': '运单号',
    'WebOrderTrace_NoOrder': '订单号不存在，请重新输入',
    'DeliveryOrder_CancelReason': '取消原因',
    'DeliveryOrder_CancelReason_Null': '请输入取消原因',
    'DeliveryOrder_Cancel_Confirm': '确认取消该订单？',
    'DeliveryOrder_Estimate_City_Null': '请选择城配城市',
    'DeliveryOrder_Estimate_Unknown': '未知',
    'BranchDetail_Remark_Error': '备注文字长度不大于150',
    'BranchDetail_Address_Error': '请选择正确的地址',
    'Branch_New_Title': '新增网点',
    'Branch_Edit_Title': '修改网点',
    'AgentOrder_NoAgentUser_Error': '请选择下单用户',
    'AgentOrder_NoAgentCustomer_Error': '请选择代理客户',
    'AgentOrder_SelectAgentCustomer_Title': '选择代理客户',
    'ContractProject_New_Title': '新增合约项目',
    'Delivery_Dele_Confirm': '删除区域价格将删除区域下的所有镇的价格信息，请确认!',
    'Delivery_ChargeParameter':'收费参数',
    'Delivery_ChargeParameter_Error':'收费参数输入为空或输入出错',
    'Delivery_FreeUnit_Error':'免收单位输入为空或输入出错',
    'Delivery_EditScales_Title':'修改重量体积区间',
    'Delivery_MinValue_Error':'最小值应为数字并大于0',
    'Delivery_AreaValue_Error':'区间值要递增',
    'OrderBooking_ContactWay_Req':'手机号码与固定电话请至少填写一项',
    'OrderBooking_Sure_Button':'确定',
    'OrderBooking_Select_Button':'选择',
    'OrderBooking_CommonCargo':'常用货物',
    'OrderBooking_Cargo_Error':'【货物信息】单位体积不能超过10位，请确认！',
    'EvaluateManager_ShowAvgIntegral_Title':'评级信息',
    'FinanceEdit_FinanceAmount_Null':'请输入预融资金额',
    'FinanceEdit_FinanceAmount_Error':'预融资金额应小于可融资金额',
    'FinanceEdit_LoanOn_Null':'请输入预放款日',
    'FinanceEdit_SelectAgentUser_Title':'选择客户',
    'FinanceCalc_FinanceAmount_Null': '请输入融资金额(数字)',
    'FinanceCalc_BillGenerateDay_Null': '请输入结算账期(数字)',
    'FinanceCalc_ServiceRate_Null': '请输入结算利率(数字)',
    'OrderManager_RefuseReason_Null': '请输入拒绝原因',
    'OrderManager_CancelReason_Null': '请输入取消原因',
    'ChangeTransLine_TotalCost_Null':'勾选了保险，请填写货物价值',
    'ChangeTransLine_TotalCost_OverError': '货物总价值不能超过50万',
    'TransLineCompare_PickUpArea_Null':'请选择上门取货区域',
    'TransLineCompare_DeliveryArea_Null':'请选择送货上门区域',
    'TransLineCompare_Address_Error':'请输入正确的地址，地址格式（省-市）',
    'TransLineCompare_PleaseChose':'请选择...',
    'TransLineCompare_ShowBranch_Title':'查看网点',
    'TransLineDetail_Name_Repeat':'干线名称重复',
    'TransLineDetail_Orgin_Error': '请选择正确的起始地',
    'TransLineDetail_Dest_Error': '请选择正确的目的地',
    'CarManager_Edit_Title':'编辑车辆信息',
    'CarManager_New_Title':'新增车辆信息',
    'DriverManager_Edit_Title':'编辑司机信息',
    'DriverManager_New_Title':'新增司机信息',
    'OrderChecked_DestPay_NumError':'到付费用必须为数字',
    'OrderChecked_DestPay_OverError':'到付费用不能大于实际总费用',
    'OrderChecked_DestPay_MustLargerThan0':'到付费用不能小于0',
    'OrderChecked_Refuse_Confirm':'确认要拒绝费用?',
    'Order_SaveFail':'保存失败，失败原因:',
    'Order_Dispathc_MoreThanOne':'必须保留一张订单！',
    'Order_OpperationFail':'操作失败，失败原因:',
    'Order_NoDispatchOrder':'无订单可调度',
    'OrderEvaluate_Content_Null':'请输入评论内容',
    'OrderPlatDispatch_Confirm':'确定转平台调度?',
    'Order_Sign_Confirm':'确认签收？',
    'Order_Sign_Date_Null':'请输入签收时间',
    'Order_Sign_File_Null':'请选择上传文件',
    'Order_Sign_File_Confirm':'上传附件文件？',
    'Order_Sign_Delete_Confirm':'确定删除',
    'LoginForm_Account_Null':'请输入登录名!',
    'LoginForm_Password_Null':'请输入密码!',
    'LoginForm_VerifyCode_Null':'请输入验证码!',
    'Top_Exist_Confirm':'您确认退出系统吗?',
    'Cargo_DataFormat_Confirm':'请确认数据填写正确',
    'Cargo_New_Title':'新增常用发货信息',
    'Cargo_Edit_Title':'修改常用发货信息',
    'Complain_Content_Null':'请输入回复内容',
    'Complain_ShipperContent_Null':'请输入投诉内容',
    'Complain_Closed_Confirm':'确定解决？',
    'ContactDetail_FixTele_Error':'固定电话应在7到12位',
    'FindPassword_AccountNotExists':'用户账号不存在',
    'FinanceApply_FileUpload':'资质文件上传',
    'FinanceApply_SelectAgentUser_Title':'选择客户',
    'FinanceApply_FinanceAmount_Error':'请输入正确的融资额度',
    'FinanceApply_ContractUserCode':'客户',
    'FinanceApply_ReconciliateDay_Error':'的对账日请输入整数',
    'FinanceApply_CollaborateAge_Error':'的合作年限请输入数字',
    'FinanceApply_MonthFreight_Error':'的月运费总额请输入数字',
    'ContactInfo_TeleAreaNumber_Null':'请输入电话区号',
    'ContactInfo_Telephone_Null':'请输入电话号码',
    'OfficeInfo_Summary_Error':'输入文本长度在{0}个之内',
    'ChangePwd_PwdLength_Error':'密码的最小长度是{0}个字符',
    'ChangePwd_CheckPwdLength_Error':'确认密码的最小长度是{0}个字符',
    'ChangePwd_PwdDiff':'两次密码输入不一致',
    'RegisterDetail_MustOne':'手机号码或电子邮箱必须输入一个',
    'RegisterDetail_Name_Null':'请输入你的称谓',
    'RegisterDetail_EnglishCode':'请输入英文字符!',
    'Suggestion_Content_Null':'请输入内容',
    'Message_Detail_Title':'消息明细',
    'ExchangePresent_Confirm':'确定兑换该奖品？',
    'ExchangePresent_Integral_Error':'积分不足！',
    'AgentUser_UserAccount_Repeat':'用户账号已存在!',
    'WebSiteConfig_DNS_Null':'请输入域名',
    'WebSiteConfig_DNS_Error':'门户网址请输入英文或数字',
    'WebSiteConfig_Submit_Confirm':'设定后不能修改，确定提交？',
    'WebSiteConfig_File_Req':'请上传格式为.jpg .gif .png的图片，宽度小于950px;高度80px',
    'BankCardUserName': '请输入持卡人姓名',
    'BankName': '请输入所属银行',
    'BankCardNo':'请输入银行卡号',
    'BankCardNoRange': '银行卡号是{0}－{1}位数字。'
};

var AREA_LANG = {
    FieldName:"CNName"
}