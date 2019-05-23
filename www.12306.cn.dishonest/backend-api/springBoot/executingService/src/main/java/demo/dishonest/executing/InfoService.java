package demo.dishonest.executing;

import com.google.gson.Gson;
import demo.dishonest.executing.model.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;

import java.io.File;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

@Service
public class InfoService {

    @Value(value="classpath:data.json")
    private Resource data;

    private String getData(){
        try {
            File file = data.getFile();
            long t0 = System.nanoTime();
            String jsonData = this.jsonRead(file);
            long t1 = System.nanoTime();
            long millis = TimeUnit.NANOSECONDS.toMillis(t1-t0);
            System.out.println(millis +"ms");
            return jsonData;
        } catch (Exception e) {
            return null;
        }
    }

    private String jsonRead(File file){
        Scanner scanner = null;
        StringBuilder buffer = new StringBuilder();
        try {
            scanner = new Scanner(file, "utf-8");
            while (scanner.hasNextLine()) {
                buffer.append(scanner.nextLine());
            }
        } catch (Exception e) {

        } finally {
            if (scanner != null) {
                scanner.close();
            }
        }
        return buffer.toString();
    }

    Data getDataInJSON() {
        String dataInString = getData();
        Gson g = new Gson();

        return g.fromJson(dataInString, Data.class);
    }

}

