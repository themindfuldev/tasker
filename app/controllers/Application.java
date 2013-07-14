package controllers;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

import play.Logger;
import play.api.Play;
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
		List<String> scriptsList = new ArrayList<String>();

		try {
			String line = null;
			BufferedReader scriptsFileReader = new BufferedReader(
				new FileReader(Play.current().getFile("conf/scripts"))
			);

			while ((line = scriptsFileReader.readLine()) != null) {
				line = line.trim();
				if (!line.isEmpty() && line.charAt(0) != '#') {
					File file = Play.current().getFile("app/assets/javascripts/" + line);
					if (file.exists() == false) {
						file = Play.current().getFile("public/javascripts/" + line);
					}
					addFile(file, scriptsList, "javascripts/");
				}
			}

			scriptsFileReader.close();
		} catch (Exception e) {
			Logger.error(e.getLocalizedMessage());
		}

		return ok(index.render(scriptsList));
	}
	
	private static void addFile(File file, List<String> scriptsList, String parentDirectory) {
		if (file.exists()) {
			if (file.isFile()) { 
				scriptsList.add(parentDirectory + file.getName());
			}
			else if (file.isDirectory()) {
				parentDirectory += file.getName() + "/";
				File[] childrenFiles = file.listFiles();
				for (File childrenFile: childrenFiles) {
					addFile(childrenFile, scriptsList, parentDirectory);
				}
			}
		}
		
	}

}
