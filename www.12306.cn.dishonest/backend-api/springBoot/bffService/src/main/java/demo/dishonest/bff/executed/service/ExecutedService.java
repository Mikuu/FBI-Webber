package demo.dishonest.bff.executed.service;

import demo.dishonest.bff.executed.model.ExecutedData;
import demo.dishonest.bff.executed.property.ExecutedProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExecutedService {

    @Autowired
    private ExecutedProperty executedProperty;

    public ExecutedData getExecutedData() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(executedProperty.getUrl(), ExecutedData.class);
    }
}