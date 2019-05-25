package demo.dishonest.bff;

import demo.dishonest.bff.represent.Represent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class BFFController {

    @Autowired
    private BFFService bffService;

    @RequestMapping("/query")
    public Represent getAllData() {
        return bffService.getRepresent();
    }
}
