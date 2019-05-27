package demo.dishonest.bff;

import demo.dishonest.bff.executed.service.ExecutedService;
import demo.dishonest.bff.executing.service.ExecutingService;
import demo.dishonest.bff.model.BaseEntity;
import demo.dishonest.bff.represent.InnerData;
import demo.dishonest.bff.represent.Represent;
import demo.dishonest.bff.represent.RepresentOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BFFService {

    @Autowired
    private ExecutedService executedService;

    @Autowired
    private ExecutingService executingService;

    Represent getRepresentAll() {
        InnerData innerData = new InnerData();

        innerData.setLeft(executingService.getExecutingData().getInfo());
        innerData.setRight(executedService.getExecutedData().getInfo());

        Represent represent = new Represent();
        represent.setData(innerData);

        return represent;
    }

    RepresentOne getRepresentOne(String passengerName, String passengerIdNo) {
        BaseEntity baseEntity = new BaseEntity();

        baseEntity.setCheck_flag("2");
        baseEntity.setFlag2("在动车组列车上吸烟或者在其他列车的禁烟区域吸烟的。");
        baseEntity.setPassenger_id_type("1");
        baseEntity.setStart_date("20190215");
        baseEntity.setPassenger_name(passengerName);
        baseEntity.setPassenger_id_no(passengerIdNo);

        List<BaseEntity> data = new ArrayList<>();
        data.add(baseEntity);

        RepresentOne representOne = new RepresentOne();
        representOne.setData(data);

        return representOne;
    }



}
