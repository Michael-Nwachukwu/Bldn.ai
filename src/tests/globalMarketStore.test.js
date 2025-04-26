import useGlobalStore from "../components/crypty/Stores/globalMarketStore";

const { fetchGwei } = useGlobalStore();

// Mock the fetchGwei function
jest.mock('../components/crypty/Stores/globalMarketStore', () => ({
    __esModule: true,
    default: () => ({
      fetchGwei: jest.fn(),
    }),
}));

test('fetchGwei returns expected data', async () => {
    const mockData = { rapid: '99', fast: '91', standard: '90', slow: '29', }

    fetchGwei.mockResolvedValueOnce(mockData);

    const result = await fetchGwei();

    expect(fetchGwei.mock.calls).toHaveLength(1);

    // The mock function returned the expected data
    expect(result).toEqual(mockData);

    // Inspect the return value of the first call to the function
    expect(fetchGwei.mock.results[0].value).resolves.toEqual(mockData);
});