from mmpretrain import ImageRetrievalInferencer
from mmpretrain import TextToImageRetrievalInferencer
import glob

dataset = [path for path in glob.glob("D:\VisionRetrival\IRSDB\images\**.jpg")]
print(dataset)
inferencer = ImageRetrievalInferencer(
        'resnet50-arcface_inshop',
        prototype=dataset,
        prototype_cache='images.pth')
result = inferencer('D:\VisionRetrival\IRS\MMPretrained\mmpretrain\src\Queries\query.jpg', topk=2)[0]
print(result)

# inferencer = TextToImageRetrievalInferencer(
#         'blip-base_3rdparty_retrieval',
#         prototype=dataset,
#         prototype_cache='t2i_retri.pth')
# print(inferencer('A car.')[0])