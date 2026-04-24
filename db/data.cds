@cds.persistence.exists
entity AM_GV_CL_RevTiming_01 {
	key PurchaseOrder: String(100);
	AccountAssignmentCategory: String(100);
	CompanyCode: String(100);
	Customer: String(100);
	BaseUnit: String(100);
	Customer_Country: String(100);
	Delivery_Month: String(100);
	GLAccount: String(100);
	IsCompletelyDelivered: Boolean;
	LocalCurrency: String(100);
	Material: String(100);
	Plant: String(100);
	PurchaseOrderDate: String(100);
	PurchaseOrderItem: String(100);
	PurchaseOrderItemText: String(100);
	PurchaseOrderScheduleLine: String(100);
	PurchaseOrderType: String(100);
	Purchase_Order_Month: String(100);
	PurchasingGroup: String(100);
	PurchasingOrganization: String(100);
	ScheduleLineDeliveryDate: String(100);
	Schedule_Delivery_Month: String(100);
	Supplier: String(100);
	Supplier_Country: String(100);
	SupplyingPlant: String(100);
	TCURR: String(100);
	UniqueID: String(100);
	NetOrderValue_LocalCurrency: Decimal(20,3);
	OrderQuantity: Decimal(20,3);
	NetOrderValue_TargetCurrency: Decimal(20,3);
	NetOrderValue_Tariff_TargetCurrency: Decimal(20,3);
	CC_TOTAL_TARIFF: String(100);
	Lead_TimeDays: Integer;
};

@cds.persistence.exists
entity SalesOrderView {
	key technicalID : UUID;
	Material : String;
	Material_Text : String;
	MaterialGroup : String;
	Material_Group_Text : String;
	SalesOrderDate: Date;
	OrderMonth : Integer;
	OrderYear : Integer;
	ActualOrderQuantityUnit : Decimal(30,5);
	Predicted_Net_Amount: Decimal(30,5);
	predicted_Sum_OrderQuantity: Decimal(30,5);
	Actual_OrderQuantity: Decimal(30,5);
	RequestedQuantity: Decimal(30,5);
	RequestedQuantityUnit: String;
	ActualNetPricePer_Quantity: Decimal(30,5);
	ActualNetAmount: Decimal(30,5);
	Expected_Billing_Date: Date;
	predicted_at: Timestamp;
	Expected_Payment_Date: Date;
	Expected_Payment_Month: Integer
};
