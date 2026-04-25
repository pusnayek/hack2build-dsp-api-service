@cds.persistence.exists
entity ViewSalesPredictionActuals {
	key technicalID : UUID;
	Material : String;
	Material_Text : String;
	MaterialGroup : String;
	Material_Group_Text : String;
	PredictedSalesOrderDate: Date;
	PredictedSalesOrderMonth : Integer;
	PredictedSalesOrderYear : Integer;
	Predicted_Sales_Order_Quantity: Decimal;
	Predicted_Net_Amount: Decimal;
	Sum_OrderQuantity: Integer;
	ActualSalesOrderDate: Date;
	Expected_Billing_Date: Timestamp;
	Sum_NetAmount: Decimal;
	Actuals_salesOrder_quantity: Decimal;
	ActualSalesOrderMonth: Integer;
	Price_Per_quantity: Decimal;
	Expected_Payment_Date: Timestamp;
	Expected_Payment_Month: Integer;
	gap_actual_vs_forecast: Decimal;
	Percentage_error: Decimal;
};

@cds.persistence.exists
entity ViewSalesPedictionPast {
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