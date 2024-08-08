package ptithcm.tttn.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Data
public class TrackingRequest {
    @JsonProperty("tracking_number")
    private String trackingNumber;

    @JsonProperty("carrier_code")
    private String carrierCode;

    @JsonProperty("destination_code")
    private String destinationCode;

    @JsonProperty("original_country_code")
    private String originalCountryCode;

    private String recipientName;
    private String recipientPhone;
    private String address;
    private String note;

    public TrackingRequest() {
    }
}