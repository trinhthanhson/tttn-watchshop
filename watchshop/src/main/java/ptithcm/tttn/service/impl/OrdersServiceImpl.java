package ptithcm.tttn.service.impl;

import org.springframework.stereotype.Service;
import ptithcm.tttn.entity.*;
import ptithcm.tttn.repository.OrderDetailRepo;
import ptithcm.tttn.repository.OrdersRepo;
import ptithcm.tttn.request.OrderRequest;
import ptithcm.tttn.request.ProductSaleRequest;
import ptithcm.tttn.request.StatisticRequest;
import ptithcm.tttn.service.*;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrdersServiceImpl implements OrdersService {
    private final OrdersRepo ordersRepo;
    private final UserService userService;
    private final CustomerService   customerService;
    private final OrderDetailRepo orderDetailRepo;
    private final CartService cartService;
    private final CartDetailService cartDetailService;
    private final StaffService staffService;

    public OrdersServiceImpl(OrdersRepo ordersRepo, UserService userService, CustomerService customerService, OrderDetailRepo orderDetailRepo, CartService cartService, CartDetailService cartDetailService, StaffService staffService) {
        this.ordersRepo = ordersRepo;
        this.userService = userService;
        this.customerService = customerService;
        this.orderDetailRepo = orderDetailRepo;
        this.cartService = cartService;
        this.cartDetailService = cartDetailService;
        this.staffService = staffService;
    }

    @Override
    @Transactional
    public Orders orderBuyNow(OrderRequest rq, String jwt) throws Exception {
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

    @Override
    public Orders orderBuyCart(OrderRequest rq, String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Customer customer = customerService.findByUserId(user.getUser_id());
        Cart cart = cartService.findCartByJwtCustomer(jwt);
        List<OrderDetail> list = new ArrayList<>();
        int totalQuantity = 0;
        for (CartDetail detail : cart.getCartDetails()) {
            OrderDetail orderDetail = new OrderDetail();
            // orderDetail.setOder_id(createdOrders.getOrder_id());
            orderDetail.setPrice(detail.getPrice());
            orderDetail.setProduct_id(detail.getProduct_id());
            orderDetail.setQuantity(detail.getQuantity());
            OrderDetail createDetail = orderDetailRepo.save(orderDetail);
            totalQuantity += createDetail.getQuantity();
            list.add(createDetail);
        }
        Orders orders = new Orders();
        orders.setCreated_at(LocalDateTime.now());
        orders.setNote(rq.getNote());
        orders.setAddress(rq.getAddress());
        orders.setRecipient_name(rq.getRecipient_name());
        orders.setRecipient_phone(rq.getRecipient_phone());
        orders.setUpdated_at(LocalDateTime.now());
        orders.setCreated_by(customer.getCustomer_id());
        orders.setStatus("0");
        orders.setTotal_price(rq.getTotal_price());
        orders.setTotal_quantity(totalQuantity);
        Orders createdOrders = ordersRepo.save(orders);
        for (OrderDetail item : list) {
            item.setOrder_id(createdOrders.getOrder_id());
            orderDetailRepo.save(item);
        }
        cartDetailService.deleteCartDetail(cart.getCart_id());
        cartService.autoUpdateCart(cart.getCart_id());
        return createdOrders;
    }
    @Override
    public List<StatisticRequest> getTotalAmountByMonth(int year){
        List<Object[]> results = ordersRepo.getTotalAmountByMonth(year);
        return results.stream()
                .map(this::mapToStatisticRequest)
                .collect(Collectors.toList());
    }

    @Override
    public List<Orders> findAll() {
        return ordersRepo.findAll();
    }

    @Override
    public List<ProductSaleRequest> getTotalAmountByDate(Date start, Date end){
        List<Object[]> results = ordersRepo.getTotalAmountByDate(start, end);
        return results.stream()
                .map(this::mapToProductSaleRequest)
                .collect(Collectors.toList());

    }

    @Override
    public Orders updateStatusOrderByStaff(String status, Long id, String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Staff staff = staffService.findByUserId(user.getUser_id());
        Orders findOrder = findById(id);
        if(findOrder != null){
            findOrder.setStatus(status);
            findOrder.setUpdated_staff(staff.getStaff_id());
            return  ordersRepo.save(findOrder);
        }
        throw new Exception("Not found order by id " + id);
    }
    private ProductSaleRequest mapToProductSaleRequest(Object[] result) {
        String productId = (String) result[0];
        String productName = (String) result[1];
        long totalSoldQuantity = (long) result[2];
        long totalQuanity = (long) result[3];
        return new ProductSaleRequest(productId, productName, totalSoldQuantity,totalQuanity);
    }

    private StatisticRequest mapToStatisticRequest(Object[] result) {
        int month = (int) result[0];
        long price = (long) result[1];
        return new StatisticRequest(month,price);
    }
}
