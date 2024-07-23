package ptithcm.tttn.service.impl;

import org.springframework.stereotype.Service;
import ptithcm.tttn.entity.Customer;
import ptithcm.tttn.entity.OrderDetail;
import ptithcm.tttn.entity.Orders;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.repository.OrderDetailRepo;
import ptithcm.tttn.repository.OrdersRepo;
import ptithcm.tttn.request.BuyNowRequest;
import ptithcm.tttn.service.CustomerService;
import ptithcm.tttn.service.OrdersService;
import ptithcm.tttn.service.UserService;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersServiceImpl implements OrdersService {
    private final OrdersRepo ordersRepo;
    private final UserService userService;
    private final CustomerService   customerService;
    private final OrderDetailRepo orderDetailRepo;

    public OrdersServiceImpl(OrdersRepo ordersRepo, UserService userService, CustomerService customerService, OrderDetailRepo orderDetailRepo) {
        this.ordersRepo = ordersRepo;
        this.userService = userService;
        this.customerService = customerService;
        this.orderDetailRepo = orderDetailRepo;
    }

    @Override
    @Transactional
    public Orders orderBuyNow(BuyNowRequest rq, String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Customer customer = customerService.findByUserId(user.getUser_id());
        Orders orders = new Orders();
        orders.setAddress(rq.getAddress());
        orders.setStatus("0");
        orders.setCreated_at(LocalDateTime.now());
        orders.setRecipient_name(rq.getRecipient_name());
        orders.setUpdated_at(LocalDateTime.now());
        orders.setCreated_by(customer.getCustomer_id());
        orders.setNote(rq.getNote());
        orders.setRecipient_phone(rq.getRecipient_phone());
        Orders createOrders = ordersRepo.save(orders);
        if(createOrders != null){
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder_id(createOrders.getOrder_id());
            orderDetail.setProduct_id(rq.getProduct_id());
            orderDetail.setPrice(rq.getPrice());
            orderDetail.setQuantity(rq.getQuantity());
            OrderDetail createDetail = orderDetailRepo.save(orderDetail);
            if(createDetail != null){
                int totalPrice = orderDetailRepo.totalPriceByOrderId(createOrders.getOrder_id());
                int totalQuantity = orderDetailRepo.totalQuantityByOrderId(createOrders.getOrder_id());
                createOrders.setTotal_quantity(totalQuantity);
                createOrders.setTotal_price(totalPrice);
                ordersRepo.save(createOrders);
            }
        }
        return createOrders;
    }

    @Override
    public List<Orders> findByJwtCustomer(String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Customer customer = customerService.findByUserId(user.getUser_id());
        return ordersRepo.findByCustomerId(customer.getCustomer_id());
    }

    @Override
    public Orders findById(Long id) throws Exception {
        Optional<Orders> orders = ordersRepo.findById(id);
        if(orders.isPresent()){
            return orders.get();
        }
        throw new Exception("not found order by id " + id);
    }

    @Override
    @Transactional
    public Orders updateStatus(String status,Long id, String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Customer customer = customerService.findByUserId(user.getUser_id());
        Orders findOrder = findById(id);
    if(findOrder != null){
        findOrder.setStatus(status);
        findOrder.setUpdated_by(customer.getCustomer_id());
        return  ordersRepo.save(findOrder);
    }
    throw new Exception("Not found order by id " + id);
    }
}
