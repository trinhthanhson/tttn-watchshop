package ptithcm.tttn.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PaymentResponse {
    public String code;
    public String message;
    public String paymentUrl;
}
