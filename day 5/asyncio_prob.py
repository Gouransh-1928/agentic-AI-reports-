import asyncio

async def task1():
    raise ValueError("bad")

async def task2():
    return 10

async def main():
    result = await asyncio.gather(
        task1(),
        task2(),
        return_exceptions=True
    )

    print(result)

asyncio.run(main())