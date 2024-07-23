package ptithcm.tttn.service;

import ptithcm.tttn.entity.Orders;
import ptithcm.tttn.request.BuyNowRequest;

import java.util.List;

public interface OrdersService {

    Orders orderBuyNow(BuyNowRequest rq, String jwt) throws Exception;

    List<Orders> findByJwtCustomer(String jwt) throws Exception;

    Orders findById(Long id) throws Exception;

    Orders updateStatus(String status, Long id, String jwt) throws Exception;
}
