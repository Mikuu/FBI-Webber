package demo.dishonest.bff;

import demo.dishonest.bff.represent.Represent;
import demo.dishonest.bff.represent.RepresentOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class BFFController {

    @Autowired
    private BFFService bffService;

    @RequestMapping("/query")
    public Represent getAllData() {
        return bffService.getRepresentAll();
    }

    @PostMapping("/getOne")
    public RepresentOne addTestCase(@RequestParam("passenger_name") String passengerName,
                                    @RequestParam("passenger_id_no") String passengerIdNo) {
        return bffService.getRepresentOne(passengerName, passengerIdNo);
    }
}
