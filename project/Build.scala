import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName         = "tasker"
  val appVersion      = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    "postgresql" % "postgresql" % "8.4-702.jdbc4",
    "net.sf.flexjson" % "flexjson" % "3.1",
    javaCore,
    javaJdbc,
    javaEbean
  )

  val main = play.Project(appName, appVersion, appDependencies).settings(
    // Add your own project settings here      
  )

}
