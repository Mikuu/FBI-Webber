package demo.dishonest.executed;

import demo.dishonest.executed.model.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @Autowired
    private InfoService infoService;

    @RequestMapping("/query")
    public Data greeting() {
        return infoService.getDataInJSON();
    }
}
