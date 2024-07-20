package ptithcm.tttn.controller.customer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ptithcm.tttn.entity.Cart;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.request.AddItemRequest;
import ptithcm.tttn.response.ApiResponse;
import ptithcm.tttn.response.EntityResponse;
import ptithcm.tttn.service.CartService;
import ptithcm.tttn.service.UserService;

@RestController
@RequestMapping("/api/customer/cart")
public class CartCustomerController {

    private final CartService cartService;

    public CartCustomerController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/")
    public ResponseEntity<EntityResponse<Cart>> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws Exception {
        EntityResponse res = new EntityResponse();
        try{
            Cart cart = cartService.findCartByJwtCustomer(jwt);
            if(cart != null){
                res.setStatus(HttpStatus.OK);
                res.setCode(HttpStatus.OK.value());
                res.setData(cart);
                res.setMessage("success");
            }else{
                res.setStatus(HttpStatus.OK);
                res.setCode(HttpStatus.OK.value());
                res.setData(null);
                res.setMessage("fail");
            }
        }catch (Exception e){
            res.setStatus(HttpStatus.CONFLICT);
            res.setCode(HttpStatus.CONFLICT.value());
            res.setData(null);
            res.setMessage("error " + e.getMessage());
        }
        return new ResponseEntity<>(res,res.getStatus());
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization") String jwt){


        ApiResponse res = new ApiResponse();
        try{
                cartService.addCartItem(jwt,req);
                res.setStatus(HttpStatus.OK);
                res.setCode(HttpStatus.OK.value());
                res.setMessage("Add cart item success");
        }catch (Exception e){
            res.setStatus(HttpStatus.CONFLICT);
            res.setCode(HttpStatus.CONFLICT.value());
            res.setMessage("error " + e.getMessage());
        }
        return new ResponseEntity<>(res,res.getStatus());
    }

}
