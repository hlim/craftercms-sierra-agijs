@Grapes(
  @Grab(group='commons-fileupload', module='commons-fileupload', version='1.3.3')
)

import org.apache.commons.fileupload.disk.DiskFileItemFactory
import org.apache.commons.fileupload.servlet.ServletFileUpload
import org.apache.commons.io.FilenameUtils

System.out.println("UPLOAD PIC 111")
def factory = new DiskFileItemFactory()
def upload = new ServletFileUpload(factory)
System.out.println("A")

def files = upload.parseRequest(request)
System.out.println("B")
def avatar = files.find { !it.isFormField() }
System.out.println("C")
def fileName = "blob.${FilenameUtils.getExtension(avatar.getName())}"
System.out.println("D")
def picStream = picResource.inputStream
System.out.println("E")

return picStream