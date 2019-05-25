package demo.dishonest.bff;

import demo.dishonest.bff.executed.service.ExecutedService;
import demo.dishonest.bff.executing.service.ExecutingService;
import demo.dishonest.bff.represent.InnerData;
import demo.dishonest.bff.represent.Represent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BFFService {

    @Autowired
    private ExecutedService executedService;

    @Autowired
    private ExecutingService executingService;

    Represent getRepresent() {
        InnerData innerData = new InnerData();

        innerData.setLeft(executingService.getExecutingData().getInfo());
        innerData.setRight(executedService.getExecutedData().getInfo());

        Represent represent = new Represent();
        represent.setData(innerData);

        return represent;
    }

}
