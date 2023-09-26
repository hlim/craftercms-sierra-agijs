@Grapes(
  @Grab(group='commons-fileupload', module='commons-fileupload', version='1.3.3')
)

import org.apache.commons.fileupload.disk.DiskFileItemFactory
import org.apache.commons.fileupload.servlet.ServletFileUpload
import org.apache.commons.io.FilenameUtils

System.out.println("UPLOAD PIC")
def factory = new DiskFileItemFactory()
def upload = new ServletFileUpload(factory)
def files = upload.parseRequest(request)
def avatar = files.find { !it.isFormField() }
def fileName = "picResource.${FilenameUtils.getExtension(avatar.getName())}"
def picStream = picResource.inputStream


return picStream