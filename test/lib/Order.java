package lib;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * This annotation interface will allow JUnit 4 tests ordering. 
 * 
 * @author joscarsson
 * @see http://stackoverflow.com/questions/3089151/specifying-an-order-to-junit-4-tests-at-the-method-level-not-class-level
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface Order {
    public int order();
}