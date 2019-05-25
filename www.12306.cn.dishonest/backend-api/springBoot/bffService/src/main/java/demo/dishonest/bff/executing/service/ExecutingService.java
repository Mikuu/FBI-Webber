package demo.dishonest.bff.executing.service;

import demo.dishonest.bff.executing.model.ExecutingData;
import demo.dishonest.bff.executing.property.ExecutingProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExecutingService {

    @Autowired
    private ExecutingProperty executingProperty;

    public ExecutingData getExecutingData() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(executingProperty.getUrl(), ExecutingData.class);
    }
}