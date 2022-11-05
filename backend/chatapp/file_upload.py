import os

from django.views import View
from django.http import JsonResponse

from .file_s3 import MediaStorage

class FileUploadVToS3(View):
    def uploadToS3(file_obj, username, **kwargs):

        file_directory_within_bucket = 'user_pic/{username}'.format(username=username)

        # synthesize a full file path; note that we included the filename
        file_path_within_bucket = os.path.join(
            file_directory_within_bucket,
            # file_obj.name
            'asdf'
            
        )
        if file_obj.content_type != ('image/jpeg' or 'image/png'):
            return False

        media_storage = MediaStorage()

        if not media_storage.exists(file_path_within_bucket): # avoid overwriting existing file
            media_storage.save(file_path_within_bucket, file_obj)
            file_url = media_storage.url(file_path_within_bucket)

            return file_url
        else:
            return False