import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": "EM_5fPjeYEoW5izPQSAC8nJ_RoZeRwq6lzaIMd1VXIIXN5KhQHkAnG37vw_uoqxWayFEzwPqyDVddu6L" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          // Define the createOrder callback function
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // Set the transaction amount
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Define the onApprove callback function
          return actions.order.capture().then((details) => {
            // Handle the successful payment
            console.log("Payment completed successfully", details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
