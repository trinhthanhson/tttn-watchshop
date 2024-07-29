package ptithcm.tttn.controller.customer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ptithcm.tttn.entity.Orders;
import ptithcm.tttn.request.OrderRequest;
import ptithcm.tttn.response.ApiResponse;
import ptithcm.tttn.response.PaymentResponse;
import ptithcm.tttn.service.OrdersService;
import ptithcm.tttn.service.VNPayService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/customer/payment")
public class CustomerPaymentController {


    private final VNPayService vnPayService;
    private final OrdersService ordersService;

    public CustomerPaymentController(VNPayService vnPayService, OrdersService ordersService) {
        this.vnPayService = vnPayService;
        this.ordersService = ordersService;
    }

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse> submitOrder(
            @RequestBody OrderRequest orderRequest,
            HttpServletRequest request, @RequestHeader("Authorization") String jwt) throws Exception {
        // Extract details from the request body
        ApiResponse res = new ApiResponse();
        Orders orders = ordersService.orderPaymentBuyNow(orderRequest,jwt);
        if(orders != null){
            int orderTotal = orders.getTotal_price();
            String orderInfo = orders.getAddress();
            // Construct base URL
            String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
            // Generate VNPay URL
            String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
            res.setMessage(vnpayUrl);
            res.setStatus(HttpStatus.OK);
            res.setCode(HttpStatus.OK.value());
            return new ResponseEntity<>(res,res.getStatus());

        }
        return ResponseEntity.status(302).header("Location", null).build();

        // Redirect the client to the VNPay URL
    }

    @GetMapping("/vnpay-payment")
    public ResponseEntity<?> handlePaymentReturn(HttpServletRequest request) {
        int paymentStatus = vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        // Return a response based on payment status
        if (paymentStatus == 1) {
            return ResponseEntity.ok().body(new PaymentResponse("Success", orderInfo, totalPrice, paymentTime, transactionId));
        } else {
            return ResponseEntity.status(400).body(new PaymentResponse("Failure", orderInfo, totalPrice, paymentTime, transactionId));
        }
    }

}
