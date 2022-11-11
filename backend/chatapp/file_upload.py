import os

from django.views import View
from django.http import JsonResponse

from .file_s3 import MediaStorage

class FileUploadVToS3(View):
    def uploadToS3(file_obj, username,path, **kwargs):
        
        file_directory_within_bucket = '{path}/{username}'.format(username=username,path=path)

        # synthesize a full file path; note that we included the filename
        file_path_within_bucket = os.path.join(
            file_directory_within_bucket,
            file_obj.name
        )
        if file_obj.content_type not in ['image/jpeg','image/png']:
            return False

        media_storage = MediaStorage()

        if not media_storage.exists(file_path_within_bucket): # avoid overwriting existing file
            media_storage.save(file_path_within_bucket, file_obj)
            file_url = media_storage.url(file_path_within_bucket)

            return file_path_within_bucket
        else:
            return False