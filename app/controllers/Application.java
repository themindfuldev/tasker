package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;

/**
 * This controller is supposed to simply expose the index view.
 * 
 * @author Tiago Garcia
 * @see http://github.com/tiagorg
 */
public class Application extends Controller {

	/**
	 * This method will render the index view.
	 * 
	 * @return the result
	 */
	public static Result index() {
		return ok(index.render());
	}

}
