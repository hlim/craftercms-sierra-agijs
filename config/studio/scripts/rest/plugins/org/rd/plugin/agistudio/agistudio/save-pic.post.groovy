@Grapes(
  @Grab(group='commons-fileupload', module='commons-fileupload', version='1.3.3')
)

import org.apache.commons.fileupload.disk.DiskFileItemFactory
import org.apache.commons.fileupload.servlet.ServletFileUpload
import org.apache.commons.io.FilenameUtils

def factory = new DiskFileItemFactory()
def upload = new ServletFileUpload(factory)
def files = upload.parseRequest(request)
def picResource = files.find { !it.isFormField() }
def fileName = "picResource.${FilenameUtils.getExtension(picResource.getName())}"
def picStream = picResource.inputStream

byte[] arr = picStream.getBytes()
def ints = []

arr.each { b -> 
  ints.add(Byte.toUnsignedInt(b)) 
}


System.out.println("Dump Picture Bytes")
System.out.println(ints)

return ints